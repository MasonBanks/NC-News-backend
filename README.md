# Northcoders News - Backend

## The Breakdown

`Northcoders News` is a site intended to demonstrate the skills acquired whilst studying the Full Stack Developer Course at Northcoders. 

This application implements a cultivated understanding of `Javascript` and the utilisation of Agile software development practices such as Test-Driven Development.

The frontend repo is located here:
https://github.com/MasonBanks/NC-News-frontend

## The Dependencies Involved

To build the Back End of the project, `Chai`, `Mocha`, `Supertest`, and `Nodemon` were used to test the code to confirm that the system was performing tasks as intended. The server uses `Express` and `Mongoose` to complete these tasks.

As for the front end, the site is built using `React` as the library, and also uses `Axios` for API calls, and `Moment` to assist with handling time and dates.

With that being said, let us get started:

---

## Getting Started

In order to run the App from within your workspace, we must install the necessary dependencies.

First, make sure you are in the right directory. 

### SETUP INSTRUCTIONS:
Install all the needed software:

```  
npm install
```

To search the data pages online, you can navigate to:

https://mason-nc-news.herokuapp.com/api/articles

You can then replace `/articles` in the URL with the following routes:

`/topics`

`/users`

`/comments`

---

## Routes:

### `Articles:`
```
/articles
```
`GET` all articles

```
/articles/:article_id
```
`PUT` update vote on a certain article

`GET` get a specific article by it's ID
```
/articles/:article_id/comments
```
`GET` all comments belonging to an article

`POST` comment to an article

---


### `Topics:`
```
/topics
```
`GET` get all topics available

```
/topics/:topic_slug/articles
```
`GET` get all articles belonging to a certain topic

`POST` post a new article to the specified topic

---

### `Users:`
```
/users
```
`GET` all users
```
users/:user_id
```
`GET` all information belonging to a user

---
### `Comments:`
```
/comments
```
`GET` all comments

```
/comments/:comment_id
```
`PUT` update vote count on a comment

`DELETE` delete comment from the database


---
---