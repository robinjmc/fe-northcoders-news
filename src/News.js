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
    let userLocal = localStorage.getItem("username");
    if (userLocal) {
      this.setState({
        username: userLocal
      })
    }
    fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles`)
      .then(res => {
        return res.json()
      })
      .then(articles => {
        const { userIds } = this.state
        articles.map(article => {
          if (!userIds.includes(article.created_by)) {
            userIds.push(article.created_by)
            fetch(`https://robin-pt-nc-news.herokuapp.com/api/users/${article.created_by}`)
              .then(res => { //stop doing nested then blocks robin!!!
                return res.json()
              })
              .then(userData => {
                this.state.users.push(userData)
              })
          }
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.username !== this.state.username) {
      return localStorage.setItem("username", this.state.username)
    }
  }

  logIn = (username) => {
    username.preventDefault();
    const userExists = this.state.users.filter(user => {
      return user.username === username.target.elements['username'].value
    })
    if (userExists[0]) {
      this.setState({
        username: username.target.elements['username'].value
      })
    }
  }

  logOut = () => {
    this.setState({
      username: ''
    })
    return localStorage.clear()
  }

  render() {
    let { username } = this.state;

    return (
      <div>
        <header >
          <div className="row">
            <div className="col" >
              <div className="row">
              </div>
            </div>
            <div className="col-12 col-md-7" >
              <img className="img-fluid" src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png" alt="Northcoders" />
            </div>
            <div className="col" style={{ margin: "auto", textAlign: "center", padding: "80px 80px" }}>
              {username.length ? <div> <h3>{username}</h3> <button type="button" onClick={this.logOut}>Logout</button> </div> : <LoginBox logIn={this.logIn} />}
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
