import React, { Component } from 'react';
import addDefaultSrc from './ImgLinkBroken';
import { Link } from "react-router-dom";
import VoteUpDownButtons from "./VoteUpDownButtons"



class UserArticles extends Component {
    state = {
        articles: null,
        loading: true,
        user: null
    }
    componentDidMount() {
        const { user_id } = this.props.match.params
        fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles`)
            .then(res => {
                return res.json()
            })
            .then(articles => {
                this.setState({
                    articles: articles
                })
                return fetch(`https://robin-pt-nc-news.herokuapp.com/api/users/${user_id}`)
            })
            .then(res => {
                return res.json()
            })
            .then(user => {
                this.setState({
                    user: user,
                    loading: false
                })
            })
    }
    render() {
        const { loading, user, articles } = this.state;
        return (
            <div className="articleBackground">
                {loading ? <p>Loading...</p> :
                    <div>
                        <h1>{user.name}</h1>
                        <img className="img-fluid" onError={addDefaultSrc} alt={user.name} src={user.avatar_url} />
                        {articles.filter(article => {
                            return article.created_by === this.props.match.params.user_id
                        }).map(article => {
                            //could create a 'in' element that says the topic each article is in
                            return (
                                <div class="container" key={article._id}>
                                    <div className="row">
                                        <div className="col" style={{ border: "2px solid" }}>
                                            <p></p>
                                        </div>
                                        <div className="col-12 col-md-8">
                                            <div class="container" >
                                                <div className="row" style={{ padding: "3px 0" }}></div>

                                                <div className="row articleCard">
                                                    <div className="item">
                                                        <div className="col-md-3"></div>

                                                        <div className="col-md-8" style={{ padding: "70px 0", margin: "auto", border: "2px solid" }}>
                                                            <h3 style={{ padding: "10px", margin: "auto", textAlign: "right" }}>
                                                                <i class="far fa-comments fa-lg"></i>
                                                                {article.comment_count}
                                                            </h3>
                                                            <div style={{
                                                                textAlign: "right",
                                                                margin: "auto",
                                                                width: "100%",
                                                                padding: "10px",
                                                                border: "2px solid"
                                                            }}>
                                                                <Link to={`/articles/${article._id}`}>
                                                                    <h3 >{article.title}</h3>
                                                                </Link>
                                                                <h4>by {user.username}</h4>
                                                            </div>
                                                            <div style={{ padding: "15px", float: "right", textAlign: "right" }}>
                                                                <h4>{article.body.slice(0, 60)}...</h4>
                                                            </div>
                                                        </div>

                                                        <div className="col" style={{ margin: "auto", width: "100%", textAlign: "center", padding: "70px 0", border: "2px solid" }}>

                                                            <VoteUpDownButtons voteCount={article.votes} _id={article._id} type={'articles'} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row" style={{ padding: "3px 0" }}></div>
                                            </div>
                                        </div>
                                        <div className="col" style={{ border: "2px solid" }}>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default UserArticles