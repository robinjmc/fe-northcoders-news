const baseURL = 'https://robin-pt-nc-news.herokuapp.com/api/'

export const getAllTopics = () => {
    return fetch (`${baseURL}/topics`)
}
export const getAllArticles = () => {
  return fetch (`${baseURL}/articles`)
}
export const getArticleById = (slug) => {
    return fetch (`${baseURL}/articles/${slug}`)
}
export const getArticlesByTopic = (slug) => {
    return getAllTopics()
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw res;
        }
    })
    .then(topics => {
        const topic = topics.topics.find(topic => topic.slug === slug)
        return fetch (`${baseURL}/topics/${topic._id}/articles`) 
    })
}
export const getAllUsers = () => {
    return fetch (`${baseURL}/users`)
}
export const getUserById = (slug) => {
    return fetch (`${baseURL}/users/${slug}`)
}
export const getAllCommentsByArticle = (slug) => {
    return fetch (`${baseURL}/articles/${slug}/comments`)
}

export const postArticle = (topicId, title, body, userId) => {
    return fetch (`${baseURL}/topics/${topicId}/articles`, {
        method: 'post',
        body: JSON.stringify({
            title: title,
            body: body,
            user: userId
        }),
        headers: {
            'content-type': 'application/json'
        }
    })

}
export const postComment = (articleId, comment, user) => { //need to implement a check to see if user is logged in 
    let body = user ? {comment: comment, user: user} : {comment: comment}
    return fetch (`${baseURL}/articles/${articleId}/comments`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json'
        }
      })
}

export const putVote = (type, id, value) => {
    return fetch (`${baseURL}/${type}/${id}?vote=${value}`, {
        method: 'put'
    })
}