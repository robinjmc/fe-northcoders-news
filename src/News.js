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
    var aKeyName = localStorage.key(0)
    let userLocal = localStorage.getItem("username");
    console.log(userLocal, aKeyName)
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
        const { userIds, username } = this.state
        console.log(username, 'hello')
        articles.map(article => {
          if (!userIds.includes(article.created_by)) {
            userIds.push(article.created_by)
            fetch(`https://robin-pt-nc-news.herokuapp.com/api/users/${article.created_by}`)
              .then(res => { //stop doing nested then blocks robin!!!
                return res.json()
              })
              .then(userData => {
                this.state.users.push(userData)
                console.log(this.state.users)
              })
          }
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    var aKeyName = localStorage.key(0)
    let userLocal = localStorage.getItem("username");

    if (prevState.username !== this.state.username) {
      console.log(userLocal, aKeyName, 'hello', this.state.username)
      return localStorage.setItem("username", this.state.username)
    }
  }

  logIn = (username) => {
    console.log(username.target.elements['username'].value)
    username.preventDefault();
    const userExists = this.state.users.filter(user => {
      return user.username === username.target.elements['username'].value
    })
    console.log(userExists, this.state.users)
    if (userExists[0]) {
      console.log(username, "userExists!", userExists)
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
        <header style={{ border: "2px solid" }}>
          <div className="row">
            <div className="col-4" style={{ margin: "auto", width: "50%" }}>
              <div className="row">
                
              </div>
            </div>
            <div className="col-md-4" style={{ border: "2px solid" }}>
              <img className="img-fluid" src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png" alt="Northcoders" />
            </div>
            <div className="col-md-4" style={{ margin: "auto", width: "50%", textAlign:"center", border: "2px solid" }}>
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
