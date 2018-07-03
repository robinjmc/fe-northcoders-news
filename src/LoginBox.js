import React, {Component} from "react";

class LoginBox extends Component {
    state = {
        username: ''
    }
    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState === this.state && this.state.username.length > 0) {
            this.setState({
                comment: ''
            })
        }
    }
    render () {
        const {username} = this.state;
        let isUsername = username.length;
        return (
            <div className="container">
                <form>
                    <p>
                    <label className="sr-only">Username</label>
                    <input className="form-control" type="text" placeholder="Username" onChange={this.handleUsernameChange} value={username}/>
                    </p>
                    <button disabled={!isUsername || !/\S/.test(username)} type="submit" className="btn btn-block">Sign in</button>
                </form>
            </div>
        )
    }
}

export default LoginBox;