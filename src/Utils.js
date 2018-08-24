export const populateStorage = (username, userId) => {
  localStorage.setItem("loggedUsername", username)
  localStorage.setItem("loggedId", userId)
}

export const hottest = (a, b) => {
  if (a.comment_count - b.comment_count > 0 || a.comment_count - b.comment_count < 0) {
    return a.comment_count - b.comment_count
  } else {
    return a.votes - b.votes
  }
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