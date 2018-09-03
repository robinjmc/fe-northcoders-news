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
            <div>
                {
                    error ? <Error errorStatus={errorStatus} errorType={errorType} /> :
                        Object.entries(newArticle).length ?
                            <Link to={`/articles/${newArticle._id}`}>View Article</Link>
                            :
                            <div>
                                <form onSubmit={this.submit}>
                                    <h1> post article </h1>
                                    <div>
                                        {
                                            loading ? <p>Loading...</p> : topics.map(topic => {
                                                return (
                                                    <div key={topic._id} >
                                                        <h1>{topic.title}</h1>
                                                        <input type="radio" name='whichTopic' onClick={this.chooseTopic} value={topic._id} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <textarea placeholder="Title" name="articleTitle" onChange={this.handleTitleChange} value={articleTitle} />
                                    <textarea placeholder="Have your say" name="articleContent" onChange={this.handleContentChange} value={articleContent} />
                                    <button className="btn" type="submit" disabled={isContent === 0 || /\S/.test(articleContent) === false || isTopic === 0 || isTitle === 0}>Post article</button>
                                </form>
                            </div>
                }
            </div>
        )

    }
}

export default PostArticle