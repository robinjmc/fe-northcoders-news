import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import UserArticles from './UserArticles'
import Error from "./Error";
import { getAllTopics, postArticle } from "./Api"

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

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.articleStatus === 'posted') {
    //         this.setState({
    //             articleContent: '',
    //             articleTitle: '',
    //             topicChoice: '',
    //             articleStatus: ''
    //         })
    //     }
    // }

    chooseTopic = (topic) => {
        this.setState({
            topicChoice: topic.target.value
        })
    }

    postArticle = (article) => {
        article.preventDefault();
        const userId = localStorage.getItem("loggedId");
        const { topicChoice } = this.state;
        postArticle(topicChoice, article.target.elements['articleTitle'].value, article.target.elements['articleContent'].value, userId)
            .then(res => {
                return res.json()
            })
            .then(body => {
                console.log(typeof body)
                this.setState({
                    articleStatus: 'posted',
                    newArticle: body
                })
                // return <Link to={`/articles/${body._id}`}></Link> how do i automatically do to this page?
            })
            .catch(console.log)

    }

    render() {
        const { articleContent, loading, topics, topicChoice, articleTitle, error, errorStatus, errorType, newArticle } = this.state;
        // const { username } = this.props.match.params;
        console.log(this.props.match)
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
                            <form onSubmit={this.postArticle}>
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
                            {/* <UserArticles username={username}/> */}
                        </div>
                        
                
                }
            </div>
        )

    }
}

export default PostArticle