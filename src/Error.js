import React, {Component} from 'react'

class ErrorPage extends Component {
    state = {
        errorType: '',
        loading: true
    }

    componentDidMount(){
        let {errorStatus, errorType} = this.props
        if(errorStatus){
            this.setState({
                errorType: errorType,
                errorStatus: errorStatus,
                loading: false
            })
        }
    }

    render() {
        let {errorStatus} = this.props
        let {errorType, loading} = this.state
        return (
            <div>
            {
                loading ? <h1>Ooops, something went wrong!</h1> :
                <div>
                    <h1>{errorStatus}</h1>
                    <h2>{errorType}</h2>
                </div>
                }
            </div>
        )
    }
}

export default ErrorPage