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
        //console.log(topics)
        this.setState({
          topics: topics.topics,
          loading: false
        })
      })
  }
  render() {
    const { loading, topics } = this.state
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid" style={{ border: "2px solid" }}>
        {/* <div className="collapse navbar-collapse"> */}
          {
            loading ? <p>Loading...</p> : topics.map(topic => {
              return (
                <div key={topic._id} style={{ border: "2px solid" }}>
                  <Link to={`/${topic.slug}`}>
                    <h1>{topic.title}</h1>
                  </Link>
                </div>
              )
            })
          }
          <div style={{ border: "2px solid" }}>
            <Link to='/'>
              <h1>All</h1>
            </Link>
            </div>
          {/* </div> */}
        </div>
      </nav>
    );
  }
}

export default NavBar;
