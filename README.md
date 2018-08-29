# NC NEWS Front End
Northcoders News is a social news aggregation, web content rating, and discussion website. Articles are posted to a range of Topics, which they can also be filtered by. Via the API Users can voted up or down Articles, as well as post Comments on them. Comments can alsp be up or down voted. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node.js
download Node by following the installtion steps on their website (https://nodejs.org/en/)

### Installing

# Npm install
`cd` into the project folder and in the command line run $npm install or $npm i

# Npm start
To start the development env running locally `cd` in to the project folder and run in the command line $npm start

## Deployment
#Create the Heroku app
In the command line type heroku create $APP_NAME --buildpack https://github.com/mars/create-react-app-buildpack.git
Replace '$APP_NAME' with the name for your unique app.

#Commit and Deploy
Stage the code to be commited ($git add .)
Commit the code with a relevant message ($git -m 'Inital Deployment')
Push the code to the Heroku master branch ($git push heroku master)

#Vist the public site Url in your browser
In the command line run  $heroku open 
