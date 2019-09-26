const Thread = require('../models/threadModel.js')

class ReplyHandler {
  // add new reply to thread
  createReply (thread, replyObj) {
    return new Promise((resolve, reject) => {
      thread.replies.push(replyObj)
      thread.save((err, thread) => {
        if (!err) {
          console.log('Thread saved')
          resolve(thread)
        } else {
          console.log('Thread save error')
          reject(err)
        }
      })
    })
  }
  
  // return specific thread by id (removing 'delete_password' and 'reported')
  listReplies (thread_id) {
    return new Promise((resolve, reject) => {
      Thread
        .findOne({ _id: thread_id } )
        .select('-delete_password -reported')
        .exec((err, thread) => {
          if (err) {
            console.log('Thread find error')
            reject(err)
          } else if (thread) {
            console.log('Finding thread')
            resolve(thread)
          } else {
            reject('no thread exists')
          }
        })
    })
  }
  
  // change 'text' propery of specified reply object to [deleted] if 'delete_password' is matching
  deleteReply (thread, reply_id, delete_password) {
    return new Promise((resolve, reject) => {
      const reply = thread.replies.id(reply_id)
      if (reply.delete_password !== delete_password) return reject('incorrect password')
      reply.text = '[deleted]'
      thread.save((err, thread) => {
        if (!err) {
          console.log('Reply deleted')
          resolve('success')
        } else {
          console.log('Reply delete error')
          reject(err)
        }
      })
    })
  }
  
  // change 'reported' property of specified reply object to 'true'
  reportReply (thread, reply_id) {
    return new Promise((resolve, reject) => {
      const reply = thread.replies.id(reply_id)
      reply.reported = true
      thread.save((err, thread) => {
        if (!err) {
          console.log('Reply reported')
          resolve('success')
        } else {
          console.log('Reply report error')
          reject(err)
        }
      })
    })
  }
}

module.exports = ReplyHandler
