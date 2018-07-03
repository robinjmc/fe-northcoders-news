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
    render () {
        const {username} = this.state;
        let isUsername = username.length;
        return (
            <div class="container">
                <form>
                    <p>
                    <label class="sr-only">Username</label>
                    <input class="form-control" type="text" placeholder="Username" onChange={this.handleUsernameChange} value={username}/>
                    </p>
                    <button disabled={!isUsername || !/\S/.test(username)} type="submit" class="btn btn-block">Sign in</button>
                </form>
            </div>
        )
    }
}

export default LoginBox;