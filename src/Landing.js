import React, { Component } from 'react';
import { Link } from "react-router-dom";
import VoteUpDownButtons from "./VoteUpDownButtons";
import FindUsername from "./FindUsername"

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
                console.log(articles, 'did mount')
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
        console.log(this.state.articles)
        return (
            <div>
                {
                    loading ? <p>Loading...</p> : articles
                        .sort(hottest)
                        .map(article => {
                            return (
                                <div className="row">
                                    <div className="col" style={{ border: "2px solid" }}>
                                        <p></p>
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <div key={article._id} className="item" style={{ border: "2px solid" }}>
                                            <Link to={`/articles/${article._id}`}>
                                                <h3>{article.title}</h3>
                                            </Link>
                                            <h4>by</h4>
                                            <FindUsername userId={article.created_by} />
                                            <p>Comments: {article.comment_count}</p>
                                            <div style={{ margin: "auto", width: "50%", textAlign: "center", border: "2px solid" }}>
                                                <VoteUpDownButtons voteCount={article.votes} _id={article._id} type={'articles'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col" style={{ border: "2px solid" }}>
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