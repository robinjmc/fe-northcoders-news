import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ArticleComments from "./ArticleComments"
import FindUsername from "./FindUsername"

class ArticleView extends Component {
  state = {
    article: null,
    loading: true
};

componentDidMount() {
  const {article_id} = this.props.match.params
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
    render() {
      const {article_id} = this.props.match.params
      const { loading, article } = this.state;
      return (
        <div>
          { loading ? <p>Loading...</p> :
            <div>
              <h3>{article.title}</h3>
              <h4>by</h4> 
              <FindUsername userId={article.created_by}/>
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
  