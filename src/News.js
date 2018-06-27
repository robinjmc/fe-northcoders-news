import React, { Component } from 'react';
import { Route } from "react-router-dom";

import NavBar from "./NavBar"
import Articles from "./Articles"
import Article from "./Article"
class News extends Component {
  render() {
    return (
      <div>
        <header>
          <img src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png" alt="Northcoders"/>
          <NavBar />
        </header>
        <Route exact path="/" component={Articles} />
        <Route exact path="/posts/:postId" component={Article} /> 
      </div>
    
    );
  }
}

export default News;
