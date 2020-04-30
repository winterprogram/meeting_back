const express = require('express')
const app = express()
const mongoose = require('mongoose')
const fs = require('fs')
//adding appConfigs
const appconfigs = require('./config/config')
const http = require('http')
//adding middleware
const middlewareOnStart = require('./middleware/errorOnInitial')
const middlewareOnRoute = require('./middleware/errorOnRoutes')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')
const logger = require('./lib/loger')

var cors = require('cors');
app.use(cors({ origin: 'http://13.233.86.6' }));
app.use(cookieparser())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());


app.use(middlewareOnStart.appOnstart)
// adding listerner
const server = http.createServer(app)
server.listen(appconfigs.port)
// server.listen(process.env.PORT || 3000, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });
server.on('error', onError)
server.on('listening', onlisten)

function onError(error) {
    if (error.syscall !== 'listen') {
        console.log(err)
        console.log('server closed')
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
          logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
          process.exit(1);
          break;
        default:
          logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
          throw error;
      }
}

function onlisten() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind);
    console.log(`server is running on port ${appconfigs.port}`)

    let db = mongoose.connect(appconfigs.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

const socketLib = require("./lib/socketlib");
const socket=socketLib.setServer(server);

app.use(middlewareOnRoute.routes)
let route = './routes'
fs.readdirSync(route).forEach(function (file) {
    (~file.indexOf('.js'))
    let router = require(route + '/' + file)
    router.setRouter(app)
    
})

let model = './models'
fs.readdirSync(model).forEach(function (file) {
   if (~file.indexOf('.js')) require(model + '/' + file)
})


mongoose.connection.on('open', (req, res, err) => {
    if (err) {
        console.log('Error while connecting to db')
    } else {
        console.log('successful while connecting to db')
    }
})

