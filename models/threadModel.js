const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
  text: { type: String, required: [true, 'missing text'] },
  delete_password: { type: String, required: [true, 'missing pasword'] },
  created_on: { type: Date, default: Date.now },
  reported: { type: Boolean, default: false }
})


const MessageSchema = new mongoose.Schema({
  board: { type: String, required: [true, 'missing board'] },
  text: { type: String, required: [true, 'missing text'] },
  delete_password: { type: String, required: [true, 'missing pasword'] },
  created_on: { type: Date, default: Date.now },
  bumped_on: { type: Date, default: Date.now },
  reported: { type: Boolean, default: false },
  replies: [replySchema]
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message