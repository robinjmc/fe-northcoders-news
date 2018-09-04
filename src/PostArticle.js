import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Error from "./Error";
import { getAllTopics, postArticle } from "./Api";

class PostArticle extends Component {
    state = {
        articleContent: '',
        articleTitle: '',
        loading: true,
        topicChoice: '',
        articleStatus: '',
        newArticle: {},
        error: false,
        errorStatus: 0,
        errorType: ''
    }

    handleContentChange = (event) => {
        this.setState({
            articleContent: event.target.value
        })
    }
    handleTitleChange = (event) => {
        this.setState({
            articleTitle: event.target.value
        })
    }

    componentDidMount() {
        getAllTopics()
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw res;
                }
            })
            .then(topics => {
                this.setState({
                    topics: topics.topics,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: true,
                    loading: false,
                    errorStatus: err.status,
                    errorType: err.statusText
                })
            })
    }

    chooseTopic = (topic) => {
        this.setState({
            topicChoice: topic.target.value
        })
    }

    postArticle = (articleTitle, articleContent) => {
        const userId = localStorage.getItem("loggedId");
        const { topicChoice } = this.state;
        postArticle(topicChoice, articleTitle, articleContent, userId)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw res;
                }
            })
            .then(body => {
                this.setState({
                    articleStatus: 'posted',
                    newArticle: body
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: true,
                    loading: false,
                    errorStatus: err.status,
                    errorType: err.statusText
                })
            })

    }

    submit = (event) => {
        const { articleTitle, articleContent } = this.state
        event.preventDefault();
        this.postArticle(articleTitle, articleContent)
    }

    render() {
        const { articleContent, loading, topics, topicChoice, articleTitle, error, errorStatus, errorType, newArticle } = this.state;
        let isContent = articleContent.length;
        let isTopic = topicChoice.length;
        let isTitle = articleTitle.length;
        return (
            <div className="articleBackground">
                {
                    error ? <Error errorStatus={errorStatus} errorType={errorType} /> :
                        Object.entries(newArticle).length ?
                            <Link to={`/articles/${newArticle._id}`}>View Article</Link>
                            :
                            <div className="row" >
                                <div className="col-1" ></div>
                                <div className="col-9 col-lg-9 " style={{ background: "white", margin: "2em 2em 10em 2em" }} >
                                    <div className="item">
                                        <form onSubmit={this.submit}>
                                            <div style={{ margin: "0.5em 0em 0em 0em" }}><h1> New Article </h1></div>

                                            {/* <div class="form-group">
                                        {
                                            loading ? <p>Loading...</p> : topics.map(topic => {
                                                return (
                                                    <div class="form-check" key={topic._id} >
                                                    <label class="form-check-label">
                                                        // <h1>{topic.title}</h1>
                                                        <input class="form-check-input" type="radio" name='whichTopic' onClick={this.chooseTopic} value={topic._id} />
                                                        {topic.title}
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div> */}
                                            <div className="form-group">
                                                <textarea className="form-control" rows="1" placeholder="Subject" name="articleTitle" onChange={this.handleTitleChange} value={articleTitle} />
                                            </div>
                                            <div className="form-group">
                                                <textarea className="form-control" rows="4" placeholder="Have your say" name="articleContent" onChange={this.handleContentChange} value={articleContent} />
                                            </div>
                                            <div className="form-group " >
                                                <h5 >Topic:</h5>
                                                <div className="row" >
                                                                <div style={{padding: "0.5em"}}></div>
                                                    {
                                                        loading ? <p>Loading...</p> : topics.map(topic => {
                                                            return (
                                                                <div className="form-check col-sm" key={topic._id} style={{ padding: "2em", border:"rgba(0,0,0,0.18) solid 0.1em"}} >
                                                                    <label className="form-check-label" style={{  width:"100%"}}>
                                                                    <div style={{ textAlign:"center"}}>
                                                                        <input className="form-check-input" type="radio" name='whichTopic' onClick={this.chooseTopic} value={topic._id}/>
                                                                        {topic.title}
                                                                    </div>
                                                                    </label>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <div style={{padding: "0.5em"}} ></div>
                                                </div>
                                            </div>
                                            {/* <div className="form-group">
                                                <label for="topicSelect">Topic</label>
                                                <select id="topicSelect" className="form-control"> */}
                                            {
                                                // loading ? <p>Loading...</p> : topics.map(topic => {
                                                //     return (
                                                //         <option key={topic._id} >
                                                //             {topic.title}
                                                //             {/* <input type="radio" name='whichTopic' onClick={this.chooseTopic} value={topic._id} /> */}
                                                //         </option>
                                                //     )
                                                // })
                                            }
                                            {/* </select>
                                            </div> */}
                                            <div style={{ textAlign: "right", margin: "1.5em" }}>
                                                <button className="btn" type="submit" disabled={isContent === 0 || /\S/.test(articleContent) === false || isTopic === 0 || isTitle === 0}>Post article</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* <div className="col-2" ></div> */}
                            </div>
                }
            </div>
        )

    }
}

export default PostArticle