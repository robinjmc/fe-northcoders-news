import React, { Component } from 'react';
import {deletePost} from './Api'

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
        this.setState({
            deleteView: !deleteView
        })
    }

    deletePost = () => {
        const { postId, deletedComment } = this.props
        deletePost(postId, 'comments')
            .then(res => {
                return res.json()
            })
            .then(body => {
                deletedComment()
            })
    }

    render() {
        let { user, deleteView } = this.state
        return (
            <div>
                {user ?
                    <div>
                        {
                            deleteView ?
                                <form >
                                    <h6><i>Delete Post?</i></h6>
                                    <button type="button" className="btn btn-danger" onClick={(e) => this.deletePost(e)}>Yes</button>
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