process.env.NODE_ENV = 'test';
const app = require('../app');
const seedDB = require('../seed/seed')
const data = require('../seed/testData/index')
const { expect } = require('chai');
const request = require('supertest')(app)
const mongoose = require('mongoose')

describe('/api', () => {
  let commentDocs, articleDocs, topicDocs, userDocs;
  beforeEach(() => {
    return seedDB(data)
      .then(docs => {
        [commentDocs, articleDocs, topicDocs, userDocs] = docs
      })
  })
  after(() => {
    mongoose.disconnect()
  })
  it('GET responds with status 200 and returns expected item', () => {
    return request.get('/api/topics')
      .expect(200)
      .then(res => {
        expect(res.body.topics[0].title).to.equal('Mitch')
      })
  })
  it('GET returns all the articles of a certain topic', () => {
    return request.get(`/api/topics/${topicDocs[0].slug}/articles`)
      .expect(200)
      .then(res => {
        expect(res.body.articles[0].belongs_to).to.equal('mitch')
      })
  })
  it('Add a new article to a topic', () => {
    return request.post(`/api/topics/mitch/articles`)
      .send({
        title: 'testArticle',
        body: 'testBody',
        created_by: userDocs[0]._id
      })
      .expect(201)
      .then(res => {
        expect(res.body.post).to.have.all.keys(
          'title',
          'body',
          '_id',
          'belongs_to',
          'created_at',
          'created_by',
          'votes',
          '__v'
        )
      })
  })
  it('GET responds with status 200 and returns expected item', () => {
    return request.get('/api/articles')
      .expect(200)
      .then(res => {
        expect(res.body.articles[0].belongs_to).to.equal('mitch')
      })
  })
  it('GET returns all the comments for a individual article', () => {
    return request.get(`/api/articles/${commentDocs[0].belongs_to}/comments`)
      .expect(200)
      .then(res => {
        expect(res.body.comments[0].votes).to.equal(7)
      })
  })
  it('will add a new comment to an article and return a 201 status', () => {
    return request.post(`/api/articles/${commentDocs[0].belongs_to}/comments`)
      .send({
        body: 'testBody',
        created_by: userDocs[0]._id
      })
      .expect(201)
      .then(res => {
        expect(res.body.comment.body).to.equal('testBody')
      })
  })
  it('will return an article if we search with ID', () => {
    const before = articleDocs[0]._id
    return request.get(`/api/articles/${articleDocs[0]._id}`)
      .expect(200)
      .then(res => {
        expect(res.body.article._id).to.equal(`${before._id}`)
      })
  })
  it('should return a 400 if category cannot be found', () => {
    return request.post('/api/articles/whatevs/comments')
      .send({
        body: 'don\'t matter',
        created_by: 'noone'
      })
      .expect(400)
  })
  it('upvotes an article', () => {
    return request.put(`/api/articles/${commentDocs[0].belongs_to}?votes=up`)
      .expect(202)
      .then(res => {
        expect(res.body.vote.votes).to.equal(1)
      })
  })
  it('downvotes an article', () => {
    return request.put(`/api/articles/${commentDocs[0].belongs_to}?votes=down`)
      .expect(202)
      .then(res => {
        expect(res.body.vote.votes).to.equal(-1)
      })
  })
  it('GET return an object of comments and a 200 status', () => {
    return request.get('/api/comments')
      .expect(200)
      .then(res => {
        expect(res.body.comments[0]._id).to.equal(`${commentDocs[0]._id}`)
      })
  })
  it('has a method that will increment the vote count on comments', () => {
    return request.put(`/api/comments/${commentDocs[0]._id}?votes=up`)
      .expect(202)
      .then(res => {
        expect(res.body.vote.votes).to.equal(8)
      })
  })
  it('comments can also be downvoted', () => {
    return request.put(`/api/comments/${commentDocs[0]._id}?votes=down`)
      .expect(202)
      .then(res => {
        expect(res.body.vote.votes).to.equal(6)
      })
  })
  it('comments can be deleted', () => {
    const before = commentDocs[0]._id
    return request.delete(`/api/comments/${commentDocs[0]._id}`)
      .expect(202)
      .then(res => {
        expect(`${before._id}`).to.equal(res.body.comment._id)
      })
  })
  it('GET returns a list of all users and their user info', () => {
    const before = userDocs[0]._id
    return request.get('/api/users')
      .expect(200)
      .then(res => {
        expect(`${before._id}`).to.equal(res.body.users[0]._id)
      })
  })
  it('We can GET one user and all of their info', () => {
    const before = userDocs[0]._id
    return request.get(`/api/users/${userDocs[0]._id}`)
      .expect(200)
      .then(res => {
        expect(`${before._id}`).to.equal(res.body.user[0]._id)
      })
  })
})