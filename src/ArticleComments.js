import React, { Component } from 'react';
import FindUsername from './FindUsername'
import VoteUpDownButtons from './VoteUpDownButtons'

class ArticleComments extends Component {
    state = {
        comments: [], //keep same data type
        loading: true
    }

    componentDidMount() {
        const {article_id} = this.props
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

    componentDidUpdate(prevProps, prevState){
        const {article_id, commentStatus, refreshComplete} = this.props
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
        else if (prevState.comments !== this.state.comments && prevProps === this.props){
            console.log('hello')
        }
    }

    voteComment = (vote, id) => {
        this.state.comments.map(comment => {
            if (comment._id === id){
                if(vote === 'up'){
                    console.log('up')
                    return comment.votes++
                }
                else if(vote === 'down'){
                    console.log('down')
                    return comment.votes--
                }
            }
        })
        console.log(this.state.comments)
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
                        <div key={comment._id}>
                            <FindUsername userId={comment.created_by} />
                            <p>{comment.body}</p>
                            <p>Votes: {comment.votes}</p>
                            <VoteUpDownButtons comment_id={comment._id} voteComment={this.voteComment}/>
                        </div>
                    )
                })
            }
            </div>
        )
    }
}

export default ArticleComments;