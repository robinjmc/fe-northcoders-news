import React, { Component } from 'react';
// import UserArticles from './UserArticles'

class PostArticle extends Component {
    state = {
        articleContent: '',
        articleTitle: '',
        loading: true,
        topicChoice: '',
        articleStatus:''
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
        fetch('https://robin-pt-nc-news.herokuapp.com/api/topics')
            .then(res => {
                return res.json()
            })
            .then(topics => {
                this.setState({
                    topics: topics.topics,
                    loading: false
                })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.articleStatus === 'posted') {
            this.setState({
                articleContent: '',
                articleTitle: '',
                topicChoice: '',
                articleStatus: ''
            })
        }
    }

    chooseTopic = (topic) => {
        this.setState({
            topicChoice: topic.target.value
        })
    }

    postArticle = (article) => {
        article.preventDefault();
        const userId = localStorage.getItem("loggedId");
        const {topicChoice} = this.state;
        console.log(topicChoice, article.target.elements['articleContent'].value, 'hello')
        fetch(`https://robin-pt-nc-news.herokuapp.com/api/topics/${topicChoice}/articles`, {
            method: 'POST',
            body: JSON.stringify({
                title: article.target.elements['articleTitle'].value ,
                body: article.target.elements['articleContent'].value ,
                user: userId
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            return res.json()
        })
        .then(body => {
            console.log(body)
            this.setState({
                articleStatus: 'posted'
            })
        })
        .catch(console.log)

    }

    render() {
        const { articleContent, loading, topics, topicChoice, articleTitle } = this.state;
        const { user_id } = this.props.match.params;
        console.log(this.props.match)
        let isContent = articleContent.length;
        let isTopic = topicChoice.length;
        let isTitle = articleTitle.length;
        return (
            <div>
                <form onSubmit={this.postArticle}>
                    <h1> post article </h1>
                    <div>
                    {
                        loading ? <p>Loading...</p> : topics.map(topic => {
                            return (
                                <div key={topic._id} >
                                    <h1>{topic.title}</h1>
                                    <input type="radio" name='whichTopic' onClick={this.chooseTopic} value={topic._id}/>
                                </div>
                            )
                        })
                    }
                    </div>
                    <textarea placeholder="Title" name="articleTitle" onChange={this.handleTitleChange} value={articleTitle} />
                    <textarea placeholder="Have your say" name="articleContent" onChange={this.handleContentChange} value={articleContent} />
                    <button className="btn" type="submit" disabled={isContent === 0 || /\S/.test(articleContent) === false || isTopic === 0 || isTitle === 0 }>Post article</button>
                </form>
                {/* <UserArticles user_id={user_id}/> */}
            </div>
        )

    }
}

export default PostArticle