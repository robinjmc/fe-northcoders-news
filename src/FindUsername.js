import React, { Component } from 'react';
import addDefaultSrc from './ImgLinkBroken';
import { Link } from "react-router-dom";

class FindUsername extends Component {
    state = {
        user: null,
        loading: true
    }
    componentDidMount() {
        const { userId } = this.props
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
    render() {
        const { loading, user } = this.state
        const { userId } = this.props
        return (
            <div>
                {
                    loading ? <p>Loading...</p> :
                        <div>
                            <Link to={`/users/${userId}`}>
                                <h4>{user.username}</h4>
                            </Link>
                            <img className="img-fluid" style={{
                                width: "200px", 
                                height: "100%",
                                objectFit: "cover"
                            }} onError={addDefaultSrc} alt={user.name} src={user.avatar_url} />
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