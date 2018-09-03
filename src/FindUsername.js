import React, { Component } from 'react';
import addDefaultSrc from './ImgLinkBroken';
import { Link } from "react-router-dom";
import { getUserById } from "./Api"

class FindUsername extends Component {
    state = {
        user: null,
        loading: true
    }
    componentDidMount() {
        const { userId } = this.props
        getUserById(userId)
            .then(res => {
                return res.json()
            })
            .then(user => {
                this.setState({
                    user: user,
                    loading: false
                })
            })
            .catch(console.log)
    }
    render() {
        const { loading, user } = this.state
        return (
            <div>
                {
                    loading ? <p>Loading...</p> :
                        <div className="row" style={{ textAlign: "center", padding: "60px 0" }}>
                            <div className="col-10 col-md-2"></div>
                            <div className="col" style={{ padding: "0px 0", margin: "auto", width: "100%" }}>
                                <Link to={`/users/${user.username}`}>
                                    <h5>{user.name}</h5>
                                </Link>
                                <img className="img-fluid" style={{
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: "50%"
                                }} onError={addDefaultSrc} alt={user.name} src={user.avatar_url} />
                            </div>
                            <div className="col-10 col-md-2"></div>
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