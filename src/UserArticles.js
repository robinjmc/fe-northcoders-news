import React, { Component } from 'react';
// import addDefaultSrc from './ImgLinkBroken';
import { Link } from "react-router-dom";
import VoteUpDownButtons from "./VoteUpDownButtons"
import FindUsername from "./FindUsername"


class UserArticles extends Component {
    state = {
        articles: null,
        loading: true,
        user: null,
        userId: ''
    }
    componentDidMount() {
        // let usernameView = localStorage.getItem("viewUsername");
        // let userIdView = localStorage.getItem("viewId");
        // const { user_id } = this.props.match.params
        let {userId} = this.state
        this.setState({
            userId: localStorage.getItem("viewId")
          })
        console.log(typeof localStorage.getItem("viewId"))
        fetch(`https://robin-pt-nc-news.herokuapp.com/api/articles`)
            .then(res => {
                return res.json()
            })
            .then(articles => {
                this.setState({
                    articles: articles
                })
                console.log(articles, localStorage)
                return fetch(`https://robin-pt-nc-news.herokuapp.com/api/users/${userId}`)
            })
            .then(res => {
                return res.json()
            })
            .then(user => {
                console.log(user, localStorage)
                this.setState({
                    user: user,
                    loading: false
                })
            })
    }
    render() {
        const { loading, articles, userId } = this.state;
        // let userIdView = localStorage.getItem("viewId");
        console.log(localStorage, userId)
        return (
            <div className="articleBackground">
                {
                    loading ? <p>Loading...</p> : articles.filter(article => {
                        console.log(article.created_by, userId)
                        return article.created_by === userId
                    })
                        .map(article => {
                            return (
                                <div key={article._id} className="row">
                                    <div className="col" >
                                        <p></p>
                                    </div>
                                    <div className="col-12 col-md-8">

                                        <div className="item" >
                                            <div className="row" style={{ padding: "3px 0" }}></div>
                                            <div className="row articleCard" style={{ padding: "3px 0" }}>
                                                <div className="col-md-3">
                                                    <FindUsername userId={article.created_by} />
                                                </div>
                                                <div className="col-md-8" style={{ padding: "70px 0", margin: "auto" }}>
                                                    <div>
                                                        <h3 style={{ padding: "10px", margin: "auto", textAlign: "right" }}>
                                                            <i class="far fa-comments fa-lg"></i>
                                                            {article.comment_count}
                                                        </h3>
                                                    </div>
                                                    <div style={{ textAlign: "right", margin: "auto", width: "100%", padding: "10px" }}>
                                                        <Link to={`/articles/${article._id}`}>
                                                            <h3>{article.title}</h3>
                                                        </Link>
                                                    </div>
                                                    <div style={{ padding: "15px", float: "right", textAlign: "right" }}>
                                                        <h4>{article.body.slice(0, 60)}...</h4>
                                                    </div>

                                                </div>
                                                <div className="col" style={{ padding: "70px 0", margin: "auto", width: "100%", textAlign: "center" }}>
                                                    <VoteUpDownButtons voteCount={article.votes} _id={article._id} type={'articles'} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: "3px 0" }}></div>
                                        </div>

                                    </div>
                                    <div className="col" >
                                        <p></p>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            // <div className="articleBackground">
            //     {loading ? <p>Loading...</p> :
            //         <div>
            //             <div className="row" style={{ border: "solid 2px" }}>
            //             <div style={{ border: "solid 2px" }}className="col-1"></div>
            //                 <div className="col-md-3">
            //                     <div className="row" style={{ textAlign: "center", padding: "70px 0" }} >
            //                         <div className="col-10 col-md-2" style={{ border: "solid 2px" }}></div>
            //                         <div className="col" style={{ padding: "70px 0", margin: "auto", width: "100%" }}>
            //                             <h1>{user.name}</h1>
            //                             <img className="img-fluid" style={{ padding: "10px 0", width: "100%", objectFit: "cover", borderRadius: "50%" }} onError={addDefaultSrc} alt={user.name} src={user.avatar_url} />
            //                         </div>
            //                         <div className="col-10 col-md-2" style={{ border: "solid 2px" }}>
            //                         </div>
            //                     </div>
            //                 </div>

            //                 <div className="col-1" style={{border: "solid 2px"}}></div>
            //                 <div className="col" style={{border: "solid 2px"}}>
            //                     {articles.filter(article => {
            //                         return article.created_by === this.props.match.params.user_id
            //                     }).map(article => {
            //                         //could create a 'in' element that says the topic each article is in
            //                         return (
            //                         <div  style={{ padding: "30px 0",  marginLeft: "0", marginRight: "auto", width: "100%" }}>
            //                             {/* <div class="container" > */}
            //                                 <div key={article._id} className="row">
            //                                     <div className="col" >
            //                                         <p></p>
            //                                     </div>
            //                                     <div className="col-12 col-md-8">
            //                                         {/* <div class="container" > */}
            //                                         <div className="item">
            //                                             <div className="row" style={{ padding: "3px 0" }}></div>

            //                                             <div className="row articleCard" style={{ padding: "3px 0" }}>

            //                                                     <div className="col-md-3" style={{ border: "2px solid"}}>
            //                                                     <FindUsername userId={article.created_by} />
            //                                                     </div>

            //                                                     <div className="col-md-8" style={{ padding: "70px 0", margin: "auto", border: "2px solid" }}>
            //                                                         <div>
            //                                                         <h3 style={{ padding: "10px", margin: "auto", textAlign: "right" }}>
            //                                                             <i class="far fa-comments fa-lg"></i>
            //                                                             {article.comment_count}
            //                                                         </h3>
            //                                                         </div>
            //                                                          <div style={{ textAlign: "right", margin: "auto",  width: "100%", padding: "10px"}}>
            //                                                             <Link to={`/articles/${article._id}`}>
            //                                                                 <h3 >{article.title}</h3>
            //                                                             </Link>
            //                                                             {/* <h4>by {user.username}</h4> */}
            //                                                         </div>
            //                                                         <div style={{ padding: "15px", float: "right", textAlign: "right" }}>
            //                                                             <h4>{article.body.slice(0, 60)}...</h4>
            //                                                         </div>
            //                                                     </div>

            //                                                     <div className="col" style={{  width: "100%", textAlign: "center", padding: "7px 0", border: "2px solid" }}>

            //                                                         <VoteUpDownButtons voteCount={article.votes} _id={article._id} type={'articles'} />
            //                                                     </div>
            //                                                 </div>
            //                                             </div>

            //                                             <div className="row" style={{ padding: "3px 0" }}></div>
            //                                         </div>
            //                                     </div>
            //                                     <div className="col">
            //                                         <p></p>
            //                                     </div>
            //                                 </div>
            //                             // </div>
            //                         )
            //                     })}
            //                 </div>
            //             </div>
            //          </div>
            //     }
            // </div>
        )
    }
}

export default UserArticles