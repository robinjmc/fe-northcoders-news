import React, { Component } from 'react';
import FindUsername from './FindUsername'
import VoteUpDownButtons from './VoteUpDownButtons'

class ArticleComments extends Component {
    state = {
        comments: [], //keep same data type
        loading: true
    }

    componentDidMount() {
        const { article_id } = this.props
        fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles/${article_id}/comments`)
            .then(res => {
                return res.json()
            })
            .then(comments => {
                this.setState({
                    comments: comments,
                    loading: false
                })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        const { article_id, commentStatus, refreshComplete } = this.props
        if (prevProps !== this.props && commentStatus === 'posted') {
            fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles/${article_id}/comments`)
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
            <div>
                {
                    loading ? <p>Loading...</p> :
                        comments.sort(mostRecent).map(comment => {
                            return (
                                <div className="row">
                                    <div className="col-2" style={{ border: "2px solid" }}>
                                        <p></p>
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <div key={comment._id} className="item">
                                            <div className="row">
                                                <div className="col" style={{ margin: "auto", padding: "70px 0", textAlign: "center", border: "2px solid" }}>
                                                    <div className="row" style={{ border: "1px solid", width: "60%", margin: "auto" }}>
                                                        <div className="col-12 col-md-4" >
                                                            <div>
                                                                <FindUsername userId={comment.created_by} />
                                                            </div>
                                                        </div>
                                                        <div className="col" style={{ border: "2px solid", padding: "70px 0" }}>
                                                            <p style={{ border: "2px solid", padding: "70px 0" }}>{comment.body}</p>
                                                        </div>
                                                        <div className="col-12 col-md-3" style={{ margin: "auto", width: "50%", textAlign: "center", border: "2px solid" }}>

                                                <VoteUpDownButtons voteCount={comment.votes} _id={comment._id} type={'comments'} />
                                            </div>
                                                    </div>
                                                    
                                                </div>
                                                
                                            
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-2" style={{ border: "2px solid" }}>
                                        <p></p>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        )
    }
}

export default ArticleComments;