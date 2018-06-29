import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ArticleComments from "./ArticleComments"

class ArticleView extends Component {
  state = {
    article: null,
    loading: true
};

componentDidMount() {
  const {article_id} = this.props.match.params
  // fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles/${article_id}/comments`)
  //   .then(res => {
  //     return res.json()
  //   })
  //   .then(comments => {
  //     console.log(comments, 'didmount')
  //     this.setState({
  //       comments: comments
  //     })
  //   })
  fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles/${article_id}`)
    .then(res => {
        return res.json()  
    })
    .then(article => {
      console.log(article)
        this.setState({
            article: article, 
            loading: false
        })
    })
}
    render() {
      const {article_id} = this.props.match.params
      const { loading, article } = this.state;
      return (
        <div>
          { loading ? <p>Loading...</p> :
            <div>
              <h3>{article.title}</h3>
              <p>{article.body}</p>
            </div>
          }
        <Link to="/">return to feed</Link>  
        {/* create return to correct topic functionality if possible */}
          <h4>Comments</h4>
          <ArticleComments article_id={article_id}/>
        </div>
      );
    }
  }
  
  export default ArticleView;
  