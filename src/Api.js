const baseURL = 'https://robin-pt-nc-news.herokuapp.com/api/'

export const getAllArticles = () => {
  return fetch (`${baseURL}/articles`)
}
export const getArticleById = (slug) => {
    return fetch (`${baseURL}/articles/${slug}`)
}
export const getArticlesByTopic = (slug) => {
  return fetch (`${baseURL}/topics/${slug}/articles`)
}
export const getAllUsers = () => {
    return fetch (`${baseURL}/users`)
}
export const getUserById = (slug) => {
    return fetch (`${baseURL}/users/${slug}`)
}
export const getAllTopics = () => {
    return fetch (`${baseURL}/topics`)
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
export const postComment = (articleId, body) => { //need to implement a check to see if user is logged in 
    return fetch (`${baseURL}/articles/${articleId}/comments`, {
        method: 'post',
        body: body,
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