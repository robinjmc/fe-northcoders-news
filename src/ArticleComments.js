import React, { Component } from 'react';
import FindUsername from './FindUsername'
import VoteUpDownButtons from './VoteUpDownButtons'
import {getAllCommentsByArticle} from './Api'

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
                this.setState({
                    comments: comments,
                    loading: false
                })
            })
            .catch(console.log)
    }

    componentDidUpdate(prevProps, prevState) {
        const { article_id, commentStatus, refreshComplete } = this.props
        if (prevProps !== this.props && commentStatus === 'posted') {
            getAllCommentsByArticle(article_id)
                .then(res => {
                    return res.json()
                })
                .then(comments => {
                    console.log(comments)
                    //const {comments} = this.state
                    this.setState({
                        comments: comments,
                        loading: false
                    })
                    refreshComplete('posted')
                })
                .catch(console.log)
        }
    }

    render() {
        const { loading, comments } = this.state;
        let mostRecent = function (a, b) {
            if (a.created_at > b.created_at) {
                return -1
            }
            if (a.created_at < b.created_at) {
                return 1
            }
            return 0
        }
        return (
            <div className="articleBackground">
                {
                    loading ? <p>Loading...</p> :
                    comments.length > 0 ?
                        <div>{
                        comments.sort(mostRecent).map(comment => {
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