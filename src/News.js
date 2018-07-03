import React, { Component } from 'react';
import { Route } from "react-router-dom";

import NavBar from "./NavBar";
import ArticleView from "./ArticleView";
import ArticleList from "./ArticleList"
import Landing from './Landing';
import UserArticles from "./UserArticles";
import LoginBox from "./LoginBox";
class News extends Component {

  state = {
    username: '',
    userIds: [],
    users: []
  }
  //would it make more sense for me to go back to the back end and make a api/users end point that shows all users?
  componentDidMount() {
    fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles`)
    .then(res => {
      return res.json() 
    })
    .then(articles => {
      const {userIds} = this.state
      articles.map(article => {
        if(!userIds.includes(article.created_by)){
          userIds.push(article.created_by)
        }
      })
      //fetch api/users/userIds[0]
    })
    if(this.state.username.length > 0){
      return localStorage.setItem("username", this.state.username)
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.username !== this.state.username){
      return localStorage.setItem("username", this.state.username)
    }
  }

  loginIn = (username) => {

  }
  render() {
    return (
      <div>
        <header style={{ border: "2px solid" }}>
          <div className="row">
            <div className="col-4" style={{margin: "auto", width: "50%" }}>
            <div className="row">
            <div className="col-10 col-md-1" ></div>
            <div className="col" style={{  width: "50%", float:"left" }}>
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
