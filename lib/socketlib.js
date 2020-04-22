const socketio = require('socket.io');
const mongoose = require('mongoose');
const randomize = require('randomatic');
const logger = require('./loger');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const jwt = require('./jswt');
const api = require('./apiresponse');
const emptycheck = require('./emptyCheck');

let setServer = (server)=>{
    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection',(socket)=>{
        console.log("on connection--emitting verify user");
        socket.emit("verifyUser", "");

        socket.on('set-user',(authtoken)=>{
            console.log("set-user called")
            jwt.verifyToken(authtoken,(err,result)=>{
                if (err) {
                    // logger.error('','',10)
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }else{
                    let userinfo = result.data[0];
                    let userid = userinfo.userid;
                    let username=userinfo.firstname;
                    socket.userid=userid;
                    allinone(userid,username)
                }
                function allinone(userid,username){
                    redisLib.setANewOnlineUserInHash('all-user-in-one',userid,username,(err,userList)=>{
                        if(err){
                            socket.emit('get-errors',{status:500,message:'error occured while adding user in online-list'})
                        }
                        else{
                            redisLib.getAllUsersInAHash('all-user-in-one',(err,allOnlineUsers)=>{ 
                                if(err){
                                    socket.emit('get-errors',{status:500,message:'error occured while getting users from online-list'})
                                }
                                else{
                                console.log(userName+'is online');
                                socket.join('meeting');
                                myio.to('meeting').emit('online-user-list',allOnlineUsers);    
                                }     
                             })
                        }
                    })
                }
            }
            )
        })
    })
}