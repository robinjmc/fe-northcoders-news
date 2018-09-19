import React, { Component } from 'react';

class DeletePost extends Component {
    state = {
        user: false,
        deleteView: false,
        userId: ''
    }
    componentDidMount() {
        const { userId } = this.props
        let userIdLocal = localStorage.getItem("loggedId");
        if (userId === userIdLocal) {
            this.setState({
                user: true,
                userId: userIdLocal
            })
        }
    }

    hide = () => {
        const { deleteView } = this.state
        console.log('hide')
        // e.preventDefault();
        this.setState({
            deleteView: !deleteView
        })
    }

    deletePost = (e) => {

    }
    handleClick() {
        console.log('this is:', this);
    }

    render() {
        let { user, deleteView } = this.state
        return (
            <div>
                {user ?
                    <div style={{ padding: "10px", margin: "auto", textAlign: "right" }}>
                        {
                            deleteView ?
                                <form onSubmit={this.deletePost}>
                                    <h6><i>Delete Post?</i></h6>
                                    <button type="submit" className="btn btn-danger">Yes</button>
                                    <button type="button" className="btn btn-secondary" onClick={(e) => this.hide(e)}>No</button>
                                </form>
                                :
                                <button type="button" className="btn btn-outline-dark" onClick={(e) => this.hide(e)}>
                                    <h3>
                                        <i className="fa fa-trash-o fa-lg" aria-hidden="true" title="Delete Post"></i>
                                    </h3>
                                </button>
                        }
                    </div>
                    :
                    <div></div>}
            </div>
        )
    }
}

export default DeletePost