import React, { Component } from 'react';
import { Link } from "react-router-dom";
import FindUsername from './FindUsername'

class ArticleList extends Component {
    state = {
        articles: null,
        loading: true,
        topic_id: null,
        articles_comments: null
    };
    componentDidMount() {
        const { topicSlug } = this.props.match.params
        fetch('https://robin-pt-nc-news.herokuapp.com/api/articles')
        .then(res => {
            return res.json()
        })
        .then(articles => {
            const comments = articles.reduce((acc, curr) => {
                acc.push({
                    comment_count: curr.comment_count,
                    _id: curr._id
                })
                return acc;
            }, [])
            this.setState({
                articles_comments: comments
            })
        })
        fetch('https://robin-pt-nc-news.herokuapp.com/api/topics')
            .then(res => {
                return res.json()
            })
            .then(topics => {
                let [topic] = topics.topics.filter(topic => topic.slug === topicSlug)
                this.setState({
                    topic_id: topic._id
                })
                return fetch(`https://robin-pt-nc-news.herokuapp.com/api/topics/${this.state.topic_id}/articles/`)
            })
            .then(res => {
                return res.json()
            })
            .then(articles => {
                this.setState({
                    articles: articles,
                    loading: false
                })
            })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps && prevState === this.state) {
            const { topicSlug } = this.props.match.params
            fetch('https://robin-pt-nc-news.herokuapp.com/api/topics')
                .then(res => {
                    return res.json()
                })
                .then(topics => {
                    let [topic] = topics.topics.filter(topic => topic.slug === topicSlug)
                    this.setState({
                        topic_id: topic._id
                    })
                    return fetch(`https://robin-pt-nc-news.herokuapp.com/api/topics/${this.state.topic_id}/articles/`)
                })
                .then(res => {
                    return res.json()
                })
                .then(articles => {
                    this.setState({
                        articles: articles,
                        loading: false
                    })
                })
        }

    }
    render() {
        const { loading, articles, articles_comments } = this.state
        let hottest = function (a, b) {
            if (a.comment_count > b.comment_count) {
                return -1
            }
            if (a.comment_count < b.comment_count) {
                return 1
            }
            return 0
        }
        return (
            <div>
                {
                    loading ? <p>Loading...</p> : articles
                        .sort(hottest)
                        .map(article => {
                            return (
                                <div key={article._id}>
                                    <Link to={`/articles/${article._id}`}>
                                        <h3>{article.title}</h3>
                                    </Link>
                                    <h4>by</h4>
                                    <FindUsername userId={article.created_by}/>
                                    <p>comments: {articles_comments.filter(comment => comment._id === article._id)[0].comment_count} votes: {article.votes}</p>
                                </div>
                            )
                        })
                }
            </div>
        );
    }
}

export default ArticleList;