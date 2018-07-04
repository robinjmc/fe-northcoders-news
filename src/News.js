import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import NavBar from "./NavBar";
import ArticleView from "./ArticleView";
import ArticleList from "./ArticleList"
import Landing from './Landing';
import UserArticles from "./UserArticles";
import LoginBox from "./LoginBox";
import PostArticle from "./PostArticle"

import "./News.css"
class News extends Component {
  state = {
    username: '',
    userId: ''
  }
  componentDidMount() {
    let usernameLocal = localStorage.getItem("username");
    let userIdLocal = localStorage.getItem("id");
    if (usernameLocal && userIdLocal) {
      this.setState({
        username: usernameLocal,
        userId: userIdLocal
      })
    }
    fetch(`https://robin-pt-nc-news.herokuapp.com/api/users`)
      .then(res => {
        return res.json()
      })
      .then(({ users }) => {
        console.log(users)
        this.setState({
          users: users
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const { username, userId } = this.state
    if (prevState.username !== this.state.username) {
      function populateStorage(username, userId) {
        localStorage.setItem("username", username)
        localStorage.setItem("id", userId)
      }
      return populateStorage(username, userId)
    }
  }

  logIn = (username) => {
    username.preventDefault();
    const userExists = this.state.users.filter(user => {
      return user.username === username.target.elements['username'].value
    })
    if (userExists[0]) {
      this.setState({
        username: username.target.elements['username'].value,
        userId: userExists[0]._id
      })
    }
  }

  logOut = () => {
    this.setState({
      username: '',
      userId: ''
    })
    return localStorage.clear()
  }

  postArticle = (userId) => {

  }

  render() {
    let { username } = this.state;
    return (
      <div>
        <header>
          <div className="row">
            <div className="col">
              <div className="row">
              </div>
            </div>
            <div className="col-12 col-md-7">
              <img className="img-fluid" src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png" alt="Northcoders" />
            </div>
            <div className="col">
              <div className="loginout">
                {username.length ? <div> 
                  <h3>{username}</h3> 
                  <button type="button" onClick={this.logOut}>Logout</button> 
                  <Link to='/topic/new_article'>
                    <h3>join the conversation</h3>
                  </Link>
                  </div> : <LoginBox logIn={this.logIn} />}
                <div>
                  
                </div>
              </div>
            </div>
          </div>
          <NavBar />
        </header>

        <Route exact path="/" component={Landing} />
        <Route exact path="/:topicSlug" component={ArticleList} />
        <Route exact path="/articles/:article_id" component={ArticleView} />
        <Route exact path="/users/:user_id" component={UserArticles} />
        <Route exact path="/topic/new_article" component={PostArticle}/>
        {/* // component={UserArticles thingIwanttoPass=this.state.users} */}

      </div>

    );
  }
}

export default News;
