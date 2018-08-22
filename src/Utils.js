export const populateStorage = (username, userId) => {
    localStorage.setItem("loggedUsername", username)
    localStorage.setItem("loggedId", userId)
  }