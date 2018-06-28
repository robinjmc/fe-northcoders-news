import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ArticleList extends Component {
    state = {
        articles: null,
        loading: true,
        topic_id: null
    };
    componentDidMount() {
        const { topicSlug } = this.props.match.params
        fetch('https://robin-pt-nc-news.herokuapp.com/api/topics')
            .then(res => {
                return res.json()
            })
            .then(topics => {
                let [topic] = topics.topics.filter(topic => topic.slug === topicSlug)
                console.log(topic)
                this.setState({
                    topic_id: topic._id
                })
                return fetch(`https://robin-pt-nc-news.herokuapp.com/api/topics/${this.state.topic_id}/articles/`)
            })
            .then(res => {
                return res.json()
            })
            .then(articles => {
                console.log(articles, 'did mount')
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
                    console.log(articles, 'did mount')
                    this.setState({
                        articles: articles,
                        loading: false
                    })
                })
        }

    }
    render() {
        const { loading, articles } = this.state
        let hottest = function (a, b) {
            if (a.comment_count > b.comment_count) {
                return -1
            }
            if (a.comment_count < b.comment_count) {
                return 1
            }
            return 0
        }
        console.log(this.state.articles)
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
                                    <p>comments: {article.comment_count} votes: {article.votes}</p>
                                </div>
                            )
                        })
                }
            </div>
        );
    }
}

export default ArticleList;