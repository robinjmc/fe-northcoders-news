import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
        console.log(article, 'did mount', article_id)
        this.setState({
            article: article, 
            loading: false
        })
    })
}
    render() {
      const { loading, article } = this.state;
      return (
        <div>
        </div>
      );
    }
  }
  
  export default ArticleView;
  