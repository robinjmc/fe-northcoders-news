import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import NavBar from "./NavBar";
import ArticleView from "./ArticleView";
import ArticleList from "./ArticleList"
import UserArticles from "./UserArticles";
import LoginBox from "./LoginBox";
import PostArticle from "./PostArticle"
import { getAllUsers } from "./Api"
import { populateStorage } from "./Utils"

import "./News.css"
class News extends Component {
  state = {
    username: '',
    userId: '',
    users: []
  }
  componentDidMount() {
    let usernameLocal = localStorage.getItem("loggedUsername");
    let userIdLocal = localStorage.getItem("loggedId");
    let username = '';
    let userId = '';
    if (usernameLocal && userIdLocal) {
      username = usernameLocal
      userId = userIdLocal
    }
    getAllUsers()
      .then(res => {
        return res.json()
      })
      .then(({ users }) => {
        console.log(users)
        this.setState({
          users: users,
          username: username,
          userId: userId
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const { username, userId } = this.state
    if (prevState.username !== this.state.username) {
      return populateStorage(username, userId)
    }
    if(username.length === 0) {
      return localStorage.clear();
    }
  }

  logIn = (username, id) => {
    // username.preventDefault();
    // const userExists = this.state.users.find(user => {
    //   return user.username === username.target.elements['username'].value
    // })
    // if (userExists) {
    //   this.setState({
    //     username: username.target.elements['username'].value,
    //     userId: userExists._id
    //   })
    // }
    this.setState({
      username: username,
      userId: id
    })
  }

  logOut = () => {
    this.setState({
      username: '',
      userId: ''
    })
    return localStorage.clear()
  }

  render() {
    let { username, users } = this.state;
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
                  </div> : <LoginBox logIn={this.logIn} users={users}/>}
                <div>
                </div>
              </div>
            </div>
          </div>
          <NavBar />
        </header>
        <Route exact path="/" component={ArticleList}  />
        <Route exact path="/:topicSlug" component={ArticleList} />
        <Route exact path="/articles/:article_id" component={ArticleView} />
        <Route exact path="/users/:username" component={UserArticles} />
        <Route exact path="/users/:username/new_article" component={PostArticle}/>
        {/* // component={UserArticles thingIwanttoPass=this.state.users} */}
      </div>
    );
  }
}

export default News;