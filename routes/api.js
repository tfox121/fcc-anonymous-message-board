/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;

const ThreadHandler = require('../controllers/threadHandler.js');
const Threads = new ThreadHandler();

const ReplyHandler = require('../controllers/replyHandler.js');
const Replies = new ReplyHandler();

module.exports = (app) => {

  app
    .route('/api/threads/:board')
    .get((req, res) => {
      Threads.listThreads(req.params.board)
        .then(data => {
          res.status(200).json(data)
        }).catch(err => {
          console.error(err)
        })
    })
    .post((req, res) => {
      req.body.board = req.params.board
      Threads.createThread(req.body)
        .then(
          res.status(200).redirect(`/b/${req.body.board}`)
        ).catch(err => {
          console.error(err)
        })
    })
    .delete((req, res) => {
      Threads.findThread(req.body.thread_id)
        .then(data => {
          return Threads.deleteThread(data, req.body.delete_password)
        }).then(data => {
          res.status(200).json(data)
        }).catch(err => {
          console.error(err)
          res.json(err)
        })
    })
    .put((req,res) => {
      Threads.findThread(req.body.report_id)
        .then(data => {
          return Threads.reportThread(data)
        }).then(data => {
          res.status(200).json(data)
        }).catch(err => {
          console.error(err)
          res.json(err)
        })
    })
  
  app
    .route('/api/replies/:board')
    .get((req, res) => {
      Replies.listReplies(req.query.thread_id)
        .then(data => {
          res.status(200).json(data)
        }).catch(err => {
          console.error(err)
        })
    })
    .post((req, res) => {
      Threads.findThread(req.body.thread_id)
        .then(data => {
          Replies.createReply(data, req.body)
        }).then(
          res.status(200).redirect(`/b/${req.params.board}/${req.body.thread_id}`)
        ).catch(err => {
          console.error(err)
        })
    })
    .delete((req, res) => {
      Threads.findThread(req.body.thread_id)
        .then(data => {
          return Replies.deleteReply(data, req.body.reply_id, req.body.delete_password)
        }).then(data => {
          res.status(200).json(data)
        }).catch(err => {
          console.error(err)
          res.json(err)
        })
    })
    .put((req,res) => {
      Threads.findThread(req.body.thread_id)
        .then(data => {
          return Threads.reportThread(data, req.body.reply_id)
        }).then(data => {
          res.status(200).json(data)
        }).catch(err => {
          console.error(err)
          res.json(err)
        })
    })
}
