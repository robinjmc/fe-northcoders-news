import React, {Component} from "react";

class LoginBox extends Component {
    state = {
        username: '',
        userExists: true
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

    submit = (event) => {
        const {username} = this.state
        const {users, logIn} = this.props
        event.preventDefault();
        const user = users.find(user => user.username === username)
        if(user){
            logIn(username, user._id)
        } else {
            this.setState({
                username: '',
                userExists: false
            })
        }
    }

    render () {
        const {username, userExists} = this.state;
        let isUsername = username.length;
        return (
            <div className="container">
                <form onSubmit={this.submit}>
                    <p>
                    <label className="sr-only">Username</label>
                    <input name="username" className="form-control" type="text" placeholder="Username" onChange={this.handleUsernameChange} value={username}/>
                    </p>
                    <button disabled={!isUsername || !/\S/.test(username)} type="submit" className="btn btn-block">Sign in</button>
                </form>
                <div>{userExists ? <div></div> : <div><p>user does not exist</p><p>try again</p></div>}</div>
            </div>
        )
    }
}

export default LoginBox;