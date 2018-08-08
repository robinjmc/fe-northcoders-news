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
    userId: '',
    viewId: '',
    view: ''
  }
  componentDidMount() {
    let usernameLocal = localStorage.getItem("loggedUsername");
    let userIdLocal = localStorage.getItem("loggedId");
    let viewIdLocal = localStorage.getItem("viewId");
    if (usernameLocal && userIdLocal) {
      this.setState({
        username: usernameLocal,
        userId: userIdLocal
      })
    }
    if(viewIdLocal){
      this.setState({
        viewId: viewIdLocal
      })
    }
    fetch(`https://robin-pt-nc-news.herokuapp.com/api/users`)
      .then(res => {
        return res.json()
      })
      .then(({ users }) => {
        this.setState({
          users: users
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const { username, userId, viewId } = this.state
    if (prevState.username !== this.state.username) {
      function populateStorage(username, userId) {
        localStorage.setItem("loggedUsername", username)
        localStorage.setItem("loggedId", userId)
      }
      return populateStorage(username, userId)
    }
    if(username.length === 0){
      return localStorage.clear();
    }
    if(prevState.viewId !== viewId){
      function populateStorage(id) {
        localStorage.setItem("viewId", userId)
      }
      return populateStorage(viewId)
    }
  }

  viewId = (id) => {
    let {viewId} = this.state
    if(viewId.length ){
      this.setState({
        view: 'user viewed!'
      })
      return viewId
    } else {
      this.setState({
        view: 'new user viewed!'
      })
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

  render() {
    let { username, userId } = this.state;
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
                  <Link to={'/'}>
                  <button type="button" onClick={this.logOut}>Logout</button>
                  </Link>
                  <Link to={`/users/${username}/new_article`}>
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

        <Route exact path="/" component={Landing} viewId={this.viewId} />
        <Route exact path="/:topicSlug" component={ArticleList} viewId={this.viewId}/>
        <Route exact path="/articles/:article_id" component={ArticleView} viewId={this.viewId}/>
        <Route exact path="/users/:username" component={UserArticles} viewId={this.viewId}/>
        <Route exact path="/users/:username/new_article" component={PostArticle}/>
        {/* // component={UserArticles thingIwanttoPass=this.state.users} */}

      </div>

    );
  }
}

export default News;
