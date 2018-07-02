import React, { Component } from 'react';

class VoteUpDownButtons extends Component {
    state = {
        UpOrDown: null,
        voteCount: 0
    }
    //bring in on props vote count then just increment/decrement on state rather than rerenderering 
    componentDidMount() {
        this.setState({
            voteCount: this.props.voteCount
        })
    }

    vote = (upDown) => {
        const { value } = upDown.target
        const { comment_id } = this.props
        const { UpOrDown } = this.state
        if (value !== UpOrDown) {
            fetch(`https://robin-pt-nc-news.herokuapp.com/api/comments/${comment_id}?vote=${value}`, {
                method: 'put'
            })
                .then(res => {
                    return res.json()
                })
                .then(voted => {
                    //voteComment(value, comment_id)
                    this.setState({
                        UpOrDown: value
                    })

                })
                .catch(console.log)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { voteCount, UpOrDown } = this.state
        if (prevState.UpOrDown !== UpOrDown) {
            if (UpOrDown === 'up') {
                console.log(voteCount)
                this.setState({
                    voteCount: voteCount + 1
                })
            }
            else if (UpOrDown === 'down') {
                console.log(voteCount)
                this.setState({
                    voteCount: voteCount - 1
                })
            }
        }
    }

    render() {
        const { UpOrDown, voteCount } = this.state;
        const up = UpOrDown === 'up' ? true : false;
        const down = UpOrDown === 'down' ? true : false;
        return (
            <div>
                {
                    <div>
                        <p>Votes: {voteCount}</p>
                        <button name="up" value="up" type="button" onClick={this.vote} disabled={up}>Up</button>
                        <button name="down" value="down" type="button" onClick={this.vote} disabled={down}>Down</button>
                    </div>
                }
            </div>
        )
    }
}

export default VoteUpDownButtons;