import React, { Component } from 'react';

class FindUsername extends Component {
    state = {
        username: null,
        loading: true
    }
    componentDidMount() {
        const {userId} = this.props
        fetch(`https://robin-pt-nc-news.herokuapp.com/api/users/${userId}`)
          .then(res => {
                return res.json()
            })
          .then(user => {
              this.setState({
                  username: user.username,
                  loading: false
                })
            })
        }
    render () {
        const {loading, username} = this.state
        return (
            <div>
                {
                    loading ? <p>Loading...</p> :
                    <h4>{username}</h4>
                }
            </div>
        )
    }
    
}
//tried to make this a function 
//all I want it to do is send back the User obj so I can decide in the file it is called what I want to render

export default FindUsername;