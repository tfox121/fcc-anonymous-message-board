/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;

const MessageHandler = require('../controllers/messageHandler.js');
const Messages = new MessageHandler();

module.exports = (app) => {
  
  app
    .route('/api/threads/:board')
    .get((req, res) => {
    console.log('GETTING MESSAGES', req.params.board)
    Messages.listMessages(req.params.board)
      .then(data => {
        res.send(data)
      }).catch(err => {
        console.error(err)
      })
    })
    .post((req, res) => {
      console.log(req.params.board)
      req.body.board = req.params.board
      Messages.createMessage(req.body)
        .then(data => {
          console.log(data)
          res.redirect(`/b/${req.body.board}`)
      })
    })
    
  app.route('/api/replies/:board');

};
