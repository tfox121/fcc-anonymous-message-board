const Thread = require('../models/threadModel.js')

class ThreadHandler {
  // create new message entry
  createThread (messageObj) {
    return new Promise((resolve, reject) => {
      const messageTemp = new Thread({      
        board: messageObj.board,
        text: messageObj.text,
        delete_password: messageObj.delete_password
      })
      messageTemp.save((err, data) => {
        if (!err) {
          console.log('Thread saved')
          resolve(data)
        } else {
          console.log('Thread save error')
          reject(err)
        }
      })
    })
  }
  
  // list all threads on specified board
  listThreads (board) {
    return new Promise((resolve, reject) => {
      Thread
        .find({ board: board } )
        .sort('-bumped_on')
        .limit(10)
        .select('-delete_password -reported')
        .exec((err, data) => {
        if (!err) {
          console.log('Listing messages')
          resolve(data)
        } else {
          console.log('Thread list error')
          reject(err)
        }
      })
    })
  }
  
  // return specific thread by id (with 'delete_password', 'reported' and 'replies')
  findThread (thread_id) {
    return new Promise((resolve, reject) => {
      Thread
        .findOne({ _id: thread_id } )
        .select('delete_password reported replies')
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
  
  // delete thread if 'delete_password' is matching
  deleteThread (thread, delete_password) {
    return new Promise((resolve, reject) => {
      if (thread.delete_password !== delete_password) return reject('incorrect password')
      thread.deleteOne((err, data) => {
        if (!err) {
          console.log('Deleting thread')
          resolve('success')
        } else {
          console.log('Thread delete error')
          reject(err)
        }
      })
    })
  }
  
  // change 'reported' property of thread to 'true' 
  reportThread (thread) {
    return new Promise((resolve, reject) => {
      thread.reported = true
      thread.save((err, thread) => {
        if (!err) {
          console.log('Thread reported')
          resolve('success')
        } else {
          console.log('Thread report error')
          reject(err)
        }
      })
    })
  }
}

module.exports = ThreadHandler
