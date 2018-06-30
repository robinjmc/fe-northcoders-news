import React, { Component } from 'react';

class VoteUpDownButtons extends Component {
    state = {
        UpOrDown: null
    }

    vote = (upDown) => {
        const {value} = upDown.target
        const {comment_id, voteComment} = this.props
        const {UpOrDown} = this.state
        if(value !== UpOrDown){
                fetch(`https://robin-pt-nc-news.herokuapp.com/api/comments/${comment_id}?vote=${value}`, {
                    method: 'put'
                })
                .then(res => {
                    return res.json()
                })
                .then(voted => {
                    voteComment(value, comment_id)
                    this.setState({
                        UpOrDown: value
                    })
                    
                })
                .catch(console.log)

        }
    }

    render() {
        const {UpOrDown} = this.state;
        const up = UpOrDown === 'up' ? true : false;
        const down = UpOrDown === 'down' ? true : false;
        return (
            <div>
                {
                    <div>
                    <button name="up" value="up" type="button" onClick={this.vote} disabled={up}>Up</button>
                    <button name="down" value="down" type="button" onClick={this.vote} disabled={down}>Down</button>
                    </div>
                }
            </div>
        )
    }
}

export default VoteUpDownButtons;