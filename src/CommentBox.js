import React, {Component} from 'react'

class CommentBox extends Component {
    state = {
        comment: ''
    };
    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState === this.state && this.state.comment.length > 0) {
            this.setState({
                comment: ''
            })
        }
    }

    render() {
        const {comment} = this.state
        let isComment = comment.length;
        return (
            <div>
                <form onSubmit={this.props.postComment}>
                    <h2>comments</h2>
                    <textarea placeholder="What do you think?" name="comment" onChange={this.handleCommentChange} value={comment}/>
                    <button className="btn" type="submit" disabled={isComment === 0 || /\S/.test(comment) === false}>Comment</button>
                </form>
            </div>
        )
    }
}

export default CommentBox