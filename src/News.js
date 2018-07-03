import React, { Component } from 'react';
import { Route } from "react-router-dom";

import NavBar from "./NavBar";
import ArticleView from "./ArticleView";
import ArticleList from "./ArticleList"
import Landing from './Landing';
import UserArticles from "./UserArticles";
import LoginBox from "./LoginBox";
class News extends Component {
  render() {
    return (
      <div>
        <header style={{ border: "2px solid" }}>
          <div className="row">
            <div className="col-4" style={{margin: "auto", width: "50%" }}>
            <div className="row">
            <div className="col-10 col-md-1" ></div>
            <div classname="col" style={{  width: "50%", float:"left" }}>
                <LoginBox />
              </div>
            </div>
            </div>
            <div className="col-md-4" style={{ border: "2px solid" }}>
              <img className="img-fluid" src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png" alt="Northcoders" />
            </div>
            <div className="col-md-4" style={{  margin: "auto", width: "50%"}}>
              
            </div>

          </div>
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
