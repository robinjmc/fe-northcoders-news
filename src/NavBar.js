import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getAllTopics } from "./Api"

import "./NavBar.css"

class NavBar extends Component {
  state = {
    topics: null,
    loading: true
  }

  componentDidMount() {
    getAllTopics()
      .then(res => {
        return res.json()
      })
      .then(topics => {
        this.setState({
          topics: topics.topics,
          loading: false
        })
      })
  }
  render() {
    const { loading, topics } = this.state
    return (
      <div>
        <div className="row articleCard" id="newsHead">
          <h1 style={{ margin: "auto" }}>News</h1>
        </div>
        <nav className="navBar navbar navbar-fluid navbar-dark bg-dark" >
          <div >
            <Link to='/'>
              <h1>All</h1>
            </Link>
          </div>
          {
            loading ? <p>Loading...</p> : topics.map(topic => {
              return (
                <div key={topic._id} >
                  <Link to={`/${topic.slug}`}>
                    <h1>{topic.title}</h1>
                  </Link>
                </div>
              )
            })
          }
        </nav>

      </div>
    );
  }
}

export default NavBar;
