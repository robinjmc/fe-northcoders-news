# FE Review

 note: i  know this seems like a lot but don't worry everyone always has a lot and most of the comments are really often repeated to most students! If you have any qus just ask and if you wanna come in /slack me at some point to clarify / get guidance on how to do something just lemme know and we can work over a lunch time 

## General
- console.logs when navigating site
- no readme
- no error handling :(
- user id shouldn't be exposed in url when you login, try using local storage instead (which i later see you are in some situations... so just a slight refactor here using local storage)
- articles break if there's no comments (comments.sort is not a function)
- some empty tags going on in your code purge!
- you don't need cors on FE only BE

# UX

  - feel like all articles should be on far left of nav no?
  - alignment of post article page off
  - doesn't tell you if you log in wrong
  - doesn't let you know that the article has been posted (redirect to new article?)
  - nice voting system
  - when posting a comment it says im logged in as jessjelly at the top but the comment is attributed to user508gh6d ??
  - clicking on user508gh6d takes me to an empty user page? 404 or say they've not posted any articles?
  - need 404s for articles and users that don't exist
  - good prevention of posting articles unless all needed parts are filled in


# Code

- repeating the string to your hosted backend: instead have api.js where you export a bunch of functions that you need e.g.
```js

const baseURL = 'myhostedbackend.herokuapp.com'


export const getAllArticles = () => {
  return fetch (`${baseURL}/articles`)
}
export const getArticlesByTopic = (slug) => {
  return fetch (`${baseURL}/${slug}/articles`)
}
```

## App.js
- appropriate use of function vs class based components (e.g. app can be functional )
- appropriate use of let and const
- make sure you only set state once: if you have conditionals that mean extra things might need to be set to state save them as variables etc.  but you don't want to set state twice in any function or lifecycle method
- little functions like populate storage could be reusable enough to abstract out into a utils file
- find vs filter: if you only expect one back and you then have to access [0] off of your filter array , use find instead it just returns the object rather than an array
- commented out code
- i see you have two different components for all articles and for articles by topic: **make Landing reusable for either all articles or articles by topic by checking the props and making the appropriate call to your backend, this is the ultimate reusability benefits of react you don't want 2 different components that render the exact same jsx just with a different call to your BE**

## Landing.js

- don't sort off state it mutates, make a shallow copy then sort that...
- also don't write a sort function inside your render it can be a utils function if you're going to use it again and again or it can be a method on the component if its only relevant here: but it is okay to call the sort on render as long as you don't mutate
- sorts can be shortened 
```js
 if (a.comment_count > b.comment_count) {
  return -1
   }
   if (a.comment_count < b.comment_count) {
       return 1
   }
   if (a.comment_count === b.comment_count) {
       if (a.votes > b.votes) {
  return -1
       }
       if (a.votes < b.votes) {
  return 1
       }
       return 0
   }

```
can become
```js
 if (a.comment_count - b.comment_count > 0 
  || a.comment_count - b.comment_count < 0)
   return a.comment_count - b.comment_count 
 else return a.votes - b.votes
```

## ArticleList.js : theoretically you should be able to delete this whole file when you've made landing reusable
- why is Landing and ArticleList so wildly different on mount they show and function exactly the same? articleList componentdidmount is waaay too long and scary you've got 3 set states, 2 calls to your BE at different times (just promsise all them at the same time) : think about what you need in state and how to stucture it (you seem to manage in Landing without all this? also don't your BE articles have comment counts on them anyway? if they don't... fix that!)


## ArticleView.js

- postcomment doesn't get passed a comment it gets passed an event which has event.target => instead in comment box make a local method handle submit which is called on submit then *that* function does the event prevent default and passes calls postcomment from props with state.comment otherwise there's little point in putting it in state 
- commented out code
- in postcomment you should recieve back the new comment and manually add it to the list of comments for that article for articleComments to render... you don't want to make extra calls to your BE when you've already got the information you need (and as far as UX goes imagine that it was a big site and had lots of users, your one comment would cause a fetch of potentially hundreds of new comments which would drown out your new one) => will simplify articlecomments as you shant need class based one anymore as it wont be fetching just rendering what its passed from articleview
- again sort mutates so abstract from render and make shallow copy


## Userarticles
- whoa loads of commented out code

## Voteupdownbuttons
- nice reusability
- what is this doing looks strange
```js
const up = UpOrDown === 'up' ? true : false;
const down = UpOrDown === 'down' ? true : false;
```