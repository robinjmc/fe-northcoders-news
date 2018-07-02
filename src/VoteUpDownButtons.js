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
        const { _id, type } = this.props
        const { UpOrDown, voteCount } = this.state
        if (value !== UpOrDown) {
            fetch(`https://robin-pt-nc-news.herokuapp.com/api/${type}/${_id}?vote=${value}`, {
                method: 'put'
            })
                .then(res => {
                    return res.json()
                })
                .then(voted => {
                    this.setState({
                        UpOrDown: value
                    })

                })
                .catch(body => {
                    if(UpOrDown === 'up'){
                        this.setState({
                            voteCount: voteCount - 1
                        })
                    }
                    else if(UpOrDown === 'down'){
                        this.setState({
                            voteCount: voteCount + 1
                        })
                    }}
                )
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
        const upOn = up ? ["fas fa-thumbs-up fa-2x", {color: "green"}] : ["far fa-thumbs-up fa-2x", {color:""}]
        const upDown = down ? ["fas fa-thumbs-down fa-2x", {color: "red"}] : ["far fa-thumbs-down fa-2x", {color:""}]
        return (
            <div>
                {
                    <div>
                        <p>Votes: {voteCount}</p>
                        <button class={upOn[0]} name="up" style={upOn[1]} value="up" type="button" onClick={this.vote} disabled={up}></button>
                        <button class={upDown[0]} name="down" style={upDown[1]} value="down" type="button" onClick={this.vote} disabled={down}></button>
                    </div>
                }
            </div>
        )
    }
}

export default VoteUpDownButtons;