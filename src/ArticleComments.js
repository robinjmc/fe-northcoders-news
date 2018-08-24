import React, { Component } from 'react';
import FindUsername from './FindUsername'
import VoteUpDownButtons from './VoteUpDownButtons'
import {getAllCommentsByArticle} from './Api'
import {mostRecent} from './Utils'

class ArticleComments extends Component {
    state = {
        comments: [], //keep same data type
        loading: true
    }

    componentDidMount() {
        const { article_id } = this.props
        getAllCommentsByArticle(article_id)
            .then(res => {
                return res.json()
            })
            .then(comments => {
                console.log(comments)
                this.setState({
                    comments: comments,
                    loading: false
                })
            })
            .catch(console.log)
    }

    componentDidUpdate(prevProps, prevState) {
        const { refreshComplete, newComment } = this.props
        const { comments } = this.state
        if(prevProps !== this.props && Object.entries(newComment).length){
            this.setState({
                comments: [...comments, newComment]
            })
            refreshComplete(newComment)
        }
    }

    render() {
        const { loading, comments } = this.state;

        let sorted = comments.length ? comments.concat().sort(mostRecent) : []
        return (
            <div className="articleBackground">
                {
                    loading ? <p>Loading...</p> :
                    comments.length > 0 ?
                        <div>{
                        sorted.map(comment => {
                            return (
                                <div key={comment._id} className="row">
                                    <div className="col-3" >
                                        <p></p>
                                    </div>
                                    <div className="col-12 col-lg-8 " >
                                        <div key={comment._id} className="item" >
                                        <div className="row" style={{ padding: "3px 0" }}></div>
                                            <div className="row articleCard">
                                                <div className="col" style={{ margin: "auto", textAlign: "center"}}>
                                                    <div className="row" >
                                                        <div className="col-12 col-md-3" >
                                                            <div>
                                                                <FindUsername userId={comment.created_by} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg" style={{ padding: "50px 0" }}>
                                                            <p style={{  padding: "70px 0" , fontSize: '1.5rem'}}>{comment.body}</p>
                                                        </div>
                                                        <div className="col-2" style={{ margin: "auto", width: "100%", textAlign: "center" }}>
                                                            <VoteUpDownButtons voteCount={comment.votes} _id={comment._id} type={'comments'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ padding: "3px 0" }}></div>
                                    </div>
                                </div>
                            )
                        })}
                        </div> :
                        <div>Be the first to Comment!</div>
                    
                }
            </div>
        )
    }
}

export default ArticleComments;