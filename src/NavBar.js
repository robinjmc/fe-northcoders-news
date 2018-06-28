import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    topics: null,
    loading: true
  }

  componentDidMount() {
    fetch('https://robin-pt-nc-news.herokuapp.com/api/topics')
      .then(res => {
        return res.json()
      })
      .then(topics => {
        console.log(topics)
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
        {
          loading ? <p>Loading...</p> : topics.map(topic => {
            return (
              <div key={topic._id}>
              <Link to={`/${topic._id}`}>
                <h1>{topic.title}</h1>
              </Link>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default NavBar;
