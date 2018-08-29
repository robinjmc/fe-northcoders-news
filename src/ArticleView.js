import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ArticleComments from "./ArticleComments"
import FindUsername from "./FindUsername"
import CommentBox from "./CommentBox"
import Error from "./Error"
import {getArticleById, postComment} from "./Api"

class ArticleView extends Component {
  state = {
    article: null,
    loading: true,
    newComment: {},
    error: false,
    errorStatus: 0,
    errorType: ''
  };

  componentDidMount() {
    const { article_id } = this.props.match.params
    getArticleById(article_id)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res;
        }
      })
      .then(article => {
        console.log(article)
        this.setState({
          article: article,
          loading: false
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: true,
          loading: false,
          errorStatus: err.status,
          errorType: err.statusText
        })
      })
  }

  postComment = (comment) => {
    const { article_id } = this.props.match.params
    // comment.preventDefault();
    const userId = localStorage.getItem("loggedId") ? localStorage.getItem("loggedId") : null;
    postComment(article_id, comment, userId)
      .then(res => {
        return res.json()
      })
      .then(body => {
        console.log(body) //use this to update comments
        this.setState({
          newComment: body
        })
      })
  }

  refreshComplete = (comment) => {
    if(Object.entries(comment).length){
      this.setState({
        newComment: {}
      })
    }
  }

  render() {
    const { article_id } = this.props.match.params
    const { loading, article, error, errorStatus, errorType, newComment } = this.state;
    return (
      <div className="articleBackground">
        {loading ? <p>Loading...</p> :
          <div>
            {
              error ? <Error errorStatus={errorStatus} errorType={errorType} /> :
                <div>
                  <div className="row">
                    {/* <div className="col-1" ><p></p></div> */}
                    <div className="col-10 col-md-3"><FindUsername userId={article.created_by} /></div>
                    <div className="col-lg" style={{ padding: "70px 0" }}>
                      <div className="row articleCard" style={{ padding: "30px 0", width: "100%", margin: "auto" }}>
                        <h3 style={{ padding: "30px 0", width: "90%", margin: "auto", textAlign: "center" }}>{article.title}</h3>
                      </div>
                      <div className="row" style={{ padding: "1px 0" }}></div>
                      <div className="row articleCard" style={{ padding: "50px 0", width: "100%", margin: "auto" }}>
                        <p style={{ padding: "30px 0", width: "90%", margin: "auto" }}>{article.body}</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-1" style={{ padding: "70px 0" }}></div>
                  </div>
                </div>}
          </div>
        }
        <Link to="/">return to feed</Link>
        {/* create return to correct topic functionality if possible */}
        {loading ? <p></p> :
          <div>
            {
              error ? <div></div> :
                <div>
                  <CommentBox postComment={this.postComment} />
                  <ArticleComments article_id={article_id} /*commentStatus={this.state.commentStatus}*/ refreshComplete={this.refreshComplete} newComment={newComment}/>
                </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default ArticleView;
