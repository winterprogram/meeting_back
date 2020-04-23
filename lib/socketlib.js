const socketio = require('socket.io');
const tokenLib = require('./tokenLib');
const redisLib = require('./redisLibs');


let setServer = (server) => {
  let io = socketio.listen(server);
  let myIo = io.of('/')
  myIo.on('connection', (socket) => {
    console.log("on connection--emitting verify user");
    socket.emit("verifyUser", "");
    

    socket.on('set-user', (authToken) => {
      console.log("set-user called")
      tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
        if (err) {
          socket.emit('auth-error', {
            status: 500,
            error: 'Please provide correct auth token'
          })
        } else {
          console.log("user is verified..setting details");
          let currentUser = user.data;
          socket.userId = currentUser.userId
          let fullName = `${currentUser.firstName} ${currentUser.lastName}`
          let key = currentUser.userId
          let value = fullName

          let setUserOnline = redisLib.setANewOnlineUserInHash("onlineUsersList", key, value, (err, result) => {
            if (err) {
              console.log(`some error occurred`)
            } else {
              
              redisLib.getAllUsersInAHash('onlineUsersList', (err, result) => {
                console.log(`--- inside getAllUsersInAHas function ---`)
                if (err) {
                  console.log(err)
                } else {
                  console.log(`${fullName} is online`);
                  socket.room = 'mettingRoom'
                  
                  socket.join(socket.room)
                  socket.to(socket.room).broadcast.emit('online-user-list', result);
                }
              })
            }
          })
        }
      })
    }) 


    socket.on('disconnect', () => {
      console.log("user is disconnected");
      if (socket.userId) {
        redisLib.deleteUserFromHash('onlineUsersList', socket.userId)
        redisLib.getAllUsersInAHash('onlineUsersList', (err, result) => {
          if (err) {
            console.log(err)
          } else {
            
            socket.room = 'LetsMeetRoom'
            socket.broadcast.emit('online-user-list', result);
          }
        })
      }
    }) 

    socket.on('notify-updates', (data) => {
      console.log("socket notify-updates called")
      console.log(data);
      socket.broadcast.emit(data.userId, data); 
    });
  });
}

module.exports = {
  setServer: setServer
}