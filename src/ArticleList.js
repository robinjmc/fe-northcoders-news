import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ArticleList extends Component {
    state = {
        articles: null,
        loading: true
    };
    componentDidMount() {
        fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles/`)
        .then(res => {
            return res.json()  
        })
        .then(articles => {
            console.log(articles, 'did mount')
            this.setState({
                articles: articles.articles, 
                loading: false
            })
        })
    }
    render() {
      return (
        <div>
        </div>
      );
    }
  }
  
  export default ArticleList;