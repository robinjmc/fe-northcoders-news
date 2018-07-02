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
                        <img onError={addDefaultSrc} alt={user.name} src={user.avatar_url} />
                        {articles.filter(article => {
                            return article.created_by === this.props.match.params.user_id
                        }).map(article => {
                            //could create a 'in' element that says the topic each article is in
                            return (
                                <div key={article._id}>
                                    <Link to={`/articles/${article._id}`}>
                                        <h3>{article.title}</h3>
                                    </Link>
                                    <h4>by {user.username}</h4>
                                    <p>Comments: {article.comment_count}</p>
                                    <VoteUpDownButtons voteCount={article.votes} _id={article._id} type={'articles'} />
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