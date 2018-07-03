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
            <div>
                {loading ? <p>Loading...</p> :
                    <div>
                        <h1>{user.name}</h1>
                        <img className="img-fluid" onError={addDefaultSrc} alt={user.name} src={user.avatar_url} />
                        {articles.filter(article => {
                            return article.created_by === this.props.match.params.user_id
                        }).map(article => {
                            //could create a 'in' element that says the topic each article is in
                            return (
                                <div class="container" >
                                    <div className="row">
                                        {/* <div className="col" style={{ border: "2px solid" }}>
                                        </div> */}
                                        <div className="col-12 col-md-8">
                                            <div class="container" >
                                                <div className="row">
                                                    <div key={article._id} className="item">
                                                        
                                                        <div className="col-sm" style={{ border: "2px solid" }}>
                                                            <div style={{
                                                                textAlign: "right",
                                                                margin: "auto",
                                                                width: "70%",
                                                                padding: "10px",
                                                                border: "2px solid"
                                                            }}>
                                                                <Link to={`/articles/${article._id}`}>
                                                                    <h3 >{article.title}</h3>
                                                                </Link>
                                                                <h4>by {user.username}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm" style={{ border: "2px solid" }}>
                                                            <p>Comments: {article.comment_count}</p>
                                                            <VoteUpDownButtons voteCount={article.votes} _id={article._id} type={'articles'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col" style={{ border: "2px solid" }}>
                                            <p></p>
                                        </div> */}
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