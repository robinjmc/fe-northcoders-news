import React, { Component } from 'react';
import { Link } from "react-router-dom";
import FindUsername from './FindUsername';
import VoteUpDownButtons from './VoteUpDownButtons';
import Error from "./Error"
import {getAllTopics, getArticlesByTopic} from './Api'

import "./ArticleList.css"

class ArticleList extends Component {
    state = {
        articles: null,
        loading: true,
        topic_id: null,
        error: false,
        errorStatus: 0,
        errorType: ''
    };
    componentDidMount() {
        const { topicSlug } = this.props.match.params
        getAllTopics()
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw res;
                }
            })
            .then(topics => {
                let [topic] = topics.topics.filter(topic => topic.slug === topicSlug)
                this.setState({
                    topic_id: topic._id
                })
                return getArticlesByTopic(this.state.topic_id)
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
            .catch(err => {
                console.log(err)
                this.setState({
                    error: true,
                    loading: false,
                    errorStatus: err.status,
                    errorType: err.statusText
                })
            })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps && prevState === this.state) {
            const { topicSlug } = this.props.match.params
            getAllTopics()
                .then(res => {
                    return res.json()
                })
                .then(topics => {
                    let [topic] = topics.topics.filter(topic => topic.slug === topicSlug)
                    this.setState({
                        topic_id: topic._id
                    })
                    //is this really nececerry? does it not just work as a link?
                    return getArticlesByTopic(this.state.topic_id)
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
        const { loading, articles, error, errorStatus, errorType } = this.state
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
                    error ? <Error errorStatus={errorStatus} errorType={errorType} /> :
                        <div className="articleBackground">
                            {
                                loading ? <p>Loading...</p> : articles
                                    .sort(hottest)
                                    .map(article => {
                                        return (
                                            <div key={article._id} className="row ">
                                                <div className="col " >
                                                    <p></p>
                                                </div>
                                                <div className="col-12 col-md-8 ">
                                                    <div className="item articleBackground" >
                                                        <div className="row" style={{ padding: "3px 0" }}></div>
                                                        <div className="row articleCard">
                                                            <div className="col-md-3">
                                                                <FindUsername userId={article.created_by} />
                                                            </div>
                                                            <div className="col-md-8" style={{ padding: "70px 0", margin: "auto" }}>
                                                                <div>
                                                                    <h3 style={{ padding: "10px", margin: "auto", textAlign: "right" }}>
                                                                        <i className="far fa-comments fa-lg"> </i>
                                                                        {article.comment_count}
                                                                    </h3>
                                                                </div>
                                                                <div style={{ textAlign: "right", margin: "auto", width: "100%", padding: "10px" }}>
                                                                    <Link to={`/articles/${article._id}`}>
                                                                        <h1>{article.title}</h1>
                                                                    </Link>
                                                                </div>
                                                                <div style={{ padding: "15px", float: "right", textAlign: "right" }}>
                                                                    <h4>{article.body.slice(0, 60)}...</h4>
                                                                </div>
                                                            </div>
                                                            <div style={{ margin: "auto", width: "100%", textAlign: "center", padding: "70px 0" }} className="col">
                                                                <VoteUpDownButtons voteCount={article.votes} _id={article._id} type={'articles'} />
                                                            </div>
                                                        </div>
                                                        <div className="row" style={{ padding: "3px 0" }}></div>
                                                    </div>
                                                </div>
                                                <div className="col" style={{}}>
                                                    <p></p>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    }
                </div>
        );
    }
}

export default ArticleList;