export const populateStorage = (username, userId) => {
  localStorage.setItem("loggedUsername", username)
  localStorage.setItem("loggedId", userId)
}

export const hottest = (a, b) => {
    return (b.comment_count + b.votes) - (a.comment_count + a.votes)
}

export const mostRecent = (a, b) => {
  if (a.created_at > b.created_at) {
    return -1
  }
  else if (a.created_at < b.created_at) {
    return 1
  }
  return 0
}