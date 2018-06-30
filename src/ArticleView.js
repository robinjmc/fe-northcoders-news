import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ArticleComments from "./ArticleComments"
import FindUsername from "./FindUsername"
import CommentBox from "./CommentBox"

class ArticleView extends Component {
  state = {
    article: null,
    loading: true,
    commentStatus: ""
  };

  componentDidMount() {
    const { article_id } = this.props.match.params
    fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles/${article_id}`)
      .then(res => {
        return res.json()
      })
      .then(article => {
        this.setState({
          article: article,
          loading: false
        })
      })
  }

  postComment = (comment) => {
    const { article_id } = this.props.match.params
    comment.preventDefault();
    console.log( JSON.stringify({comment: comment.target.elements['comment'].value}), 'hello')
    fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles/${article_id}/comments`, {
      method: 'POST',
      body: JSON.stringify({comment: comment.target.elements['comment'].value}),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      return res.json()
    })
    .then(body => {
      console.log(body)
      this.setState({
        commentStatus: 'posted'
      })
    })
  }

  refreshComplete = (status) => {
    if(status === this.state.commentStatus){
      this.setState({
        commentStatus: ""
      })
    }
  }

  render() {
    const { article_id } = this.props.match.params
    const { loading, article } = this.state;
    return (
      <div>
        {loading ? <p>Loading...</p> :
          <div>
            <h3>{article.title}</h3>
            <h4>by</h4>
            <FindUsername userId={article.created_by} />
            <p>{article.body}</p>
          </div>
        }
        <Link to="/">return to feed</Link>
        {/* create return to correct topic functionality if possible */}
        <CommentBox postComment={this.postComment}/>
        <h4>Comments</h4>
        <ArticleComments article_id={article_id} commentStatus={this.state.commentStatus} refreshComplete={this.refreshComplete}/>
      </div>
    );
  }
}

export default ArticleView;
