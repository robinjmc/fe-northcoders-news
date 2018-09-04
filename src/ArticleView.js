import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ArticleComments from "./ArticleComments"
import FindUsername from "./FindUsername"
import Error from "./Error"
import { getArticleById, postComment } from "./Api"

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
    const userId = localStorage.getItem("loggedId") ? localStorage.getItem("loggedId") : null;
    postComment(article_id, comment, userId)
      .then(res => {
        return res.json()
      })
      .then(body => {
        this.setState({
          newComment: body
        })
      })
  }

  refreshComplete = (comment) => {
    if (Object.entries(comment).length) {
      this.setState({
        newComment: {}
      })
    }
  }

  render() {
    const { article_id } = this.props.match.params
    const { loading, article, error, errorStatus, errorType, newComment } = this.state;
    console.log(article)
    return (
      <div className="articleBackground">
        {loading ? <p>Loading...</p> :
          <div>
            {
              error ? <Error errorStatus={errorStatus} errorType={errorType} /> :
                <div>
                  <div className="row">
                    {/* <div className="col-1" ><p></p></div> */}
                    <div className="col-10 col-md-3">
                      <FindUsername userId={article.created_by} />
                    </div>
                    <div className="col-lg" style={{ padding: "70px 0" }}>
                      <div className="row articleCard" style={{ padding: "30px 0", width: "100%", margin: "auto" }}>
                        <h3 style={{ padding: "30px 0", width: "90%", margin: "auto", textAlign: "center" }}>{article.title}</h3>
                      </div>
                      <div className="row" style={{ padding: "1px 0" }}></div>
                      <div className="row articleCard" style={{ padding: "50px 0", width: "100%", margin: "auto" }}>
                        <p style={{ padding: "30px 0", width: "90%", margin: "auto" }}>{article.body}</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-1" style={{ padding: "70px 0"}}></div>
                  </div>
                </div>}
          </div>
        }
        <div className="row">
          <div className="col-10 col-md-3" >
            <div className="row "style={{ padding: "0px 0", width: "100%", margin: "auto", justifyContent: "center"}}>
              <Link to="/"><button className="btn btn-link" style={{background:"white", padding:"0.5em 0.5em 0 0.5em"}}> <h5> <nav className="fas fa-arrow-circle-left"></nav> Return to feed</h5></button></Link>
            </div>
          </div>
          <div className="col-lg" style={{ padding: "70px 0" }}></div>
        </div>

        {/* create return to correct topic functionality if possible */}
        {loading ? <div></div> :
          <div>
            {
              error ? <div></div> :
                <div>
                  <ArticleComments postComment={this.postComment} article_id={article_id} /*commentStatus={this.state.commentStatus}*/ refreshComplete={this.refreshComplete} newComment={newComment} />
                </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default ArticleView;
