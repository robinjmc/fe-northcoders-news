import React, { Component } from 'react';
import FindUsername from './findUser'

class ArticleComments extends Component {
    state = {
        comments: null,
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
                        </div>
                    )
                })
            }
            </div>
        )
    }
}

export default ArticleComments;