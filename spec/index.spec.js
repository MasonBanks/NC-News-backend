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
    return request.get('/api/topics/mitch/articles')
      .expect(200)
      .then(res => {
        expect(res.body.articles[0].belongs_to).to.equal('mitch')
      })
  })
  it('Add a new article to a topic', () => {
    return request.post('/api/topics/mitch/articles')
      .send({
        title: 'testArticle',
        body: 'testBody',
        belongs_to: 'testOwner',
        created_by: userDocs[0]._id
      })
      .expect(201)
      .then(res => {
        expect(res.body.post.title).to.equal('testArticle')
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
        belongs_to: 'testOwner',
        created_by: userDocs[0]._id
      })
      .expect(201)
      .then(res => {
        expect(res.body.comment.body).to.equal('testBody')
      })
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
        expect(res.body.vote.votes).to.equal(0)
      })
  })
})