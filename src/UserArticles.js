import React, { Component } from 'react';
// import addDefaultSrc from './ImgLinkBroken';
import { Link } from "react-router-dom";
import VoteUpDownButtons from "./VoteUpDownButtons"
import FindUsername from "./FindUsername"
import Error from "./Error"
import { getAllArticles, getAllUsers } from "./Api"


class UserArticles extends Component {
    state = {
        articles: [],
        loading: true,
        user: null,
        userId: '',
        error: false,
        errorStatus: 0,
        errorType: ''
    }
    componentDidMount() {
        const { username } = this.props.match.params
        getAllArticles()
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw res;
                }
            })
            .then(articles => {
                this.setState({
                    articles: articles
                })
                return getAllUsers()
            })
            .then(res => {
                return res.json()
            })
            .then(({ users }) => {
                let user = users.find(user => user.username === username)
                this.setState({
                    user: user,
                    userId: user._id,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err.status)
                this.setState({
                    error: true,
                    loading: false,
                    errorStatus: err.status,
                    errorType: err.statusText
                })
            })
    }
    render() {
        const { loading, articles, userId, error, errorStatus, errorType } = this.state;
        let filtered = articles.length ? articles.concat().filter(article => article.created_by === userId) : []
        return (
            <div>
                {
                    error ? <Error errorStatus={errorStatus} errorType={errorType} /> :
                        <div className="articleBackground">
                            {
                                loading ? <p>Loading...</p> :
                                    filtered.length ?
                                        filtered.map(article => {
                                            return (
                                                <div key={article._id} className="row">
                                                    <div className="col"></div>
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
                                                                            <i className="far fa-comments fa-lg"></i>
                                                                            {article.comment_count}
                                                                        </h3>
                                                                    </div>
                                                                    <div style={{ textAlign: "right", margin: "auto", width: "100%", padding: "10px" }}>
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
                                                    <div className="col" ></div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div className="row">
                                            <div className="col"></div>
                                            <div className="col-12 col-md-8">
                                                <div className="item" >
                                                    <div className="row" style={{ padding: "3px 0" }}></div>
                                                    <div className="row articleCard" style={{ padding: "3px 0" }}>
                                                        <div className="col-md-3">
                                                            <FindUsername userId={userId} />
                                                        </div>
                                                        <div className="col-md-8" style={{ padding: "70px 0", margin: "auto" }}>
                                                            <div></div>
                                                            <div style={{ textAlign: "right", margin: "auto", width: "100%", padding: "10px" }}><h3><i>This user hasn't posted any articles yet!</i></h3></div>
                                                            <div></div>
                                                        </div>
                                                        <div className="col" style={{ padding: "70px 0", margin: "auto", width: "100%", textAlign: "center" }}></div>
                                                    </div>
                                                    <div className="row" style={{ padding: "3px 0" }}></div>
                                                </div>
                                            </div>
                                            <div className="col" ></div>
                                        </div>
                            }
                        </div>
                }
            </div>
        )
    }
}

export default UserArticles