import React, { Component } from 'react';

class FindUsername extends Component {
    state = {
        user: null,
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
                  user: user,
                  loading: false
                })
            })
        }
    render () {
        const {loading, user} = this.state
        return (
            <div>
                {
                    loading ? <p>Loading...</p> :
                    <div>
                    <h4>{user.username}</h4>
                    <img alt={user.name} src={user.avatar_url}/>
                    </div>
                    // doesnt the alt render if the image cant be found?
                }
            </div>
        )
    }
    
}
//tried to make this a function 
//all I want it to do is send back the User obj so I can decide in the file it is called what I want to render

export default FindUsername;