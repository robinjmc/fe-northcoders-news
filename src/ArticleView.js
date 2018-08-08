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
      .catch(err => {
        if (err.status === 404) {
          this.setState({
            error: true,
            loading: false
          })
        }
      })
  }

  postComment = (comment) => {
    const { article_id } = this.props.match.params
    comment.preventDefault();
    console.log(JSON.stringify({ comment: comment.target.elements['comment'].value }), 'hello')
    fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles/${article_id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment: comment.target.elements['comment'].value }),
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
    if (status === this.state.commentStatus) {
      this.setState({
        commentStatus: ""
      })
    }
  }

  render() {
    const { article_id } = this.props.match.params
    const { loading, article } = this.state;
    return (
      <div className="articleBackground">
        {loading ? <p>Loading...</p> :
        // <Error/>
          <div>
            <div className="row">
            {/* <div className="col-1" >
              <p></p>
                                    </div> */}
              <div className="col-10 col-md-3"><FindUsername userId={article.created_by} /></div>
              <div className="col-lg" style={{ padding: "70px 0" }}>
                <div className="row articleCard" style={{  padding: "30px 0", width: "100%", margin: "auto" }}>
                  <h3 style={{ padding: "30px 0", width: "90%", margin: "auto", textAlign: "center" }}>{article.title}</h3>
                </div>
                <div className="row" style={{ padding: "1px 0"}}></div>
                <div className="row articleCard" style={{ padding: "50px 0", width: "100%", margin: "auto" }}>
                  <p style={{ padding: "30px 0", width: "90%", margin: "auto" }}>{article.body}</p>
                </div>
              </div>
              <div className="col-12 col-md-1" style={{  padding: "70px 0" }}></div>
            </div>
          </div>
        }
        <Link to="/">return to feed</Link>
        {/* create return to correct topic functionality if possible */}
        <CommentBox postComment={this.postComment} />
        <ArticleComments article_id={article_id} commentStatus={this.state.commentStatus} refreshComplete={this.refreshComplete} />
      </div>
    );
  }
}

export default ArticleView;
