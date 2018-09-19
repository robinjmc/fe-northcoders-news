import React, { Component } from 'react'

class CommentBox extends Component {
    state = {
        comment: '',
        commentNum: 0
    };
    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    componentDidMount() {
        const { comments } = this.props
        this.setState({
            commentNum: comments
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState === this.state && this.state.comment.length > 0) {
            this.setState({
                comment: ''
            })
        }
        if(prevProps.comments > this.props.comments){
            this.setState({
                commentNum: this.state.commentNum - 1
            })
        }
    }

    submit = (event) => {
        const { commentNum } = this.state
        event.preventDefault();
        this.props.postComment(this.state.comment)
        this.setState({
            commentNum: commentNum + 1
        })
    }

    render() {
        const { comment, commentNum } = this.state
        let isComment = comment.length;
        return (
            <div className="row">
                <div className="col-3" ></div>
                <div className="col-12 col-lg-8 " >
                    <div className="item">
                        <div className="row" style={{ padding: "3px 0" }}></div>
                        <form onSubmit={this.submit}>
                            <div className="form-group">
                                <div className="row articleCard">
                                    <div className="col" style={{ margin: "1.5em"}}>
                                        <div className="row" >
                                            <h2>{commentNum} comments</h2>
                                            <textarea placeholder="What do you think?" name="comment" className="form-control" onChange={this.handleCommentChange} value={comment} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row articleCard" style={{padding: "0px 0"}}>
                                    <div className="col" style={{margin: "0em 0em 1.5em 0em", textAlign: "right" }}>
                                        <button className="btn" type="submit" disabled={isComment === 0 || /\S/.test(comment) === false}>Comment</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row" style={{ padding: "3px 0" }}></div>
                </div>
            </div>
        )
    }
}

export default CommentBox