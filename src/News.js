import React, { Component } from 'react';
import { Route } from "react-router-dom";

import NavBar from "./NavBar";
import ArticleView from "./ArticleView";
import ArticleList from "./ArticleList"
import Landing from './Landing';
import UserArticles from "./UserArticles"
class News extends Component {
  render() {
    return (
      <div>
        <header style={{border: "2px solid"}}>
          <img src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png" alt="Northcoders"/>
          <NavBar />
        </header>
       
        <Route exact path="/" component={Landing} />
        <Route exact path="/:topicSlug" component={ArticleList} />
        <Route exact path="/articles/:article_id" component={ArticleView} />
        <Route exact path="/users/:user_id" component={UserArticles} /> 
        
      </div>
    
    );
  }
}

export default News;
