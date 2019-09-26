/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  let testThread
  let testThread2
  let testReply

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      test('Test POST /api/threads/:board with thread', function (done) {
        chai.request(server)
          .post('/api/threads/general')
          .send({
            text: 'Automated test',
            delete_password: 'test'
          })
          .send({
            text: 'Automated test',
            delete_password: 'test'
          })
          .end(function (err, res) {
            if (err) console.error(err)
            assert.equal(res.status, 200)
            assert.equal(res.type, 'text/html')
          })
        chai.request(server)
          .post('/api/threads/general')
          .send({
            text: 'Automated test 2',
            delete_password: 'test'
          })
          .end(function (err, res) {
            if (err) console.error(err)
            assert.equal(res.status, 200)
            assert.equal(res.type, 'text/html')
            done()
          })
      })
    });
    
    suite('GET', function() {
      test('Test GET /api/threads/:board', function(done) {
        chai.request(server)
          .get('/api/threads/general')
          .end(function(err, res) {
            if (err) console.error(err)
            testThread = res.body[res.body.length - 2]
            testThread2 = res.body[res.body.length - 1]
            assert.equal(res.status, 200)
            assert.typeOf(res.body, 'array')
            assert.equal(res.type, 'application/json')
            done()
          });
      });
    });
        
    suite('PUT', function() {
      test('Test PUT /api/threads/:board', function(done) {
        chai.request(server)
          .put('/api/threads/general')
          .send({
            report_id: testThread._id,
          })
          .end(function(err, res) {
            if (err) console.error(err)
            assert.equal(res.status, 200)
            assert.typeOf(res.body, 'string')
            assert.equal(res.body, 'success')
            done()
          });
      });
    });
    
    suite('DELETE', function() {
      test('Test DELETE /api/threads/:board', function(done) {
        chai.request(server)
          .delete('/api/threads/general')
          .send({
            thread_id: testThread._id,
            delete_password: 'test'
          })
          .end(function(err, res) {
            if (err) console.error(err)
            assert.equal(res.status, 200)
            assert.typeOf(res.body, 'string')
            assert.equal(res.body, 'success')
            done()
          });
      });
    });

    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      test('Test POST /api/replies/:board with reply', function (done) {
        chai.request(server)
          .post('/api/replies/general')
          .send({
            thread_id: testThread2._id,
          })
          .send({
            text: 'Automated test reply',
            delete_password: 'test'
          })
          .end(function (err, res) {
            if (err) console.error(err)
            assert.equal(res.status, 200)
            assert.equal(res.type, 'text/html')
            done()
          })
      })
    });
    
    suite('GET', function() {
      test('Test GET /api/replies/:board', function(done) {
        chai.request(server)
          .get('/api/replies/general')
          .query({
            thread_id: testThread2._id
          })
          .end(function(err, res) {
            if (err) console.error(err)
            testReply = res.body.replies[res.body.replies.length - 1]
            assert.equal(res.status, 200)
            assert.typeOf(res.body.replies, 'array')
            assert.equal(res.type, 'application/json')
            done()
          });
      }); 
    });
    
    suite('PUT', function() {
      test('Test PUT /api/replies/:board', function(done) {
        chai.request(server)
          .put('/api/replies/general')
          .send({
          thread_id: testThread2._id,
          reply_id: testReply._id
          })
          .end(function(err, res) {
            if (err) console.error(err)
            assert.equal(res.status, 200)
            assert.typeOf(res.body, 'string')
            assert.equal(res.body, 'success')
            done()
          });
      });
    });

    suite('DELETE', function() {
      test('Test DELETE /api/replies/:board', function(done) {
        chai.request(server)
          .delete('/api/replies/general')
          .send({
            thread_id: testThread2._id,
            reply_id: testReply._id,
            delete_password: 'test'
          })
          .end(function(err, res) {
            if (err) console.error(err)
            assert.equal(res.status, 200)
            assert.typeOf(res.body, 'string')
            assert.equal(res.body, 'success')
            done()
          });
      });
    });
  });
});
