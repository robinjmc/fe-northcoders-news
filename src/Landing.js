import React, { Component } from 'react';
import { Link } from "react-router-dom";
import VoteUpDownButtons from "./VoteUpDownButtons";
import FindUsername from "./FindUsername"

import "./ArticleList.css"

class Landing extends Component {
    state = {
        articles: null,
        loading: true
    };
    componentDidMount() {
        fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles/`)
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
    render() {
        const { loading, articles } = this.state
        let hottest = function (a, b) {
            if (a.comment_count > b.comment_count) {
                return -1
            }
            if (a.comment_count < b.comment_count) {
                return 1
            }
            if (a.comment_count === b.comment_count) {
                if (a.votes > b.votes) {
                    return -1
                }
                if (a.votes < b.votes) {
                    return 1
                }
                return 0
            }
        }
        return (
            <div className="articleBackground">
                {
                    loading ? <p>Loading...</p> : articles
                        .sort(hottest)
                        .map(article => {
                            return (
                                <div key={article._id} className="row">
                                    <div className="col" >
                                        <p></p>
                                    </div>
                                    <div className="col-12 col-md-8">

                                        <div className="item" >
                                            <div className="row" style={{ padding: "3px 0" }}></div>
                                            <div className="row articleCard" style={{ padding: "3px 0" }}>
                                                <div className="col-md-3">
                                                    <FindUsername userId={article.created_by} />
                                                </div>
                                                <div className="col-md-8" style={{ padding: "70px 0", margin: "auto" }}>
                                                    <div>
                                                        <h3 style={{ padding: "10px", margin: "auto", textAlign: "right" }}>
                                                            <i class="far fa-comments fa-lg"></i>
                                                            {article.comment_count}
                                                        </h3>
                                                    </div>
                                                    <div style={{ textAlign: "right", margin: "auto",  width: "100%", padding: "10px"}}>
                                                        <Link to={`/articles/${article._id}`}>
                                                            <h3>{article.title}</h3>
                                                        </Link>
                                                    </div>
                                                    <div style={{ padding: "15px", float: "right", textAlign: "right" }}>
                                                        <h4>{article.body.slice(0, 60)}...</h4>
                                                    </div>

                                                </div>
                                                <div className="col" style={{ padding: "70px 0", margin: "auto", width: "100%", textAlign: "center" }}>
                                                    <VoteUpDownButtons voteCount={article.votes} _id={article._id} type={'articles'} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: "3px 0" }}></div>
                                        </div>

                                    </div>
                                    <div className="col" >
                                        <p></p>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        );
    }
}

export default Landing;