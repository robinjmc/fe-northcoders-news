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
                    <h2>Post Comment</h2>
                    <textarea placeholder="What do you think?" onChange={this.handleTweetChange} value={tweet}/>
                    <button type="submit" disabled={isComment > 0 || /\S/.test(comment) === false}>Submit</button>
                </form>
            </div>
        )
    }
}

export default CommentBox