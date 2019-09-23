const Message = require('../models/messageModel.js')



class MessageHandler {
  // create new message entry
  createMessage (messageObj) {
    return new Promise((resolve, reject) => {
      const messageTemp = new Message({      
        board: messageObj.board,
        text: messageObj.text,
        delete_password: messageObj.delete_password
      })
      messageTemp.save((err, data) => {
        if (!err) {
          console.log('Creating message')
          resolve(data)
        } else {
          console.log('Message create error')
          reject(err)
        }
      })
    })
  }
  
  listMessages (board) {
  return new Promise((resolve, reject) => {
    Message.find({ board: board }).exec((err, data) => {
      if (!err) {
        console.log('Listing messages')
        resolve(data)
      } else {
        console.log('Message list error')
        reject(err)
      }
    })
  })
}
}

module.exports = MessageHandler
