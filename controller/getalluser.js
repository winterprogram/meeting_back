const mongoose = require('mongoose')
const signupuse = require('./../model/Signup')
const usermodel = mongoose.model('userinfo')
// const mongoose = require('mongoose')
const adminmodel = mongoose.model('admininfo')
const api = require('./../lib/apiresponse')
const emptycheck = require('./../lib/emptyCheck')
const pass = require('./../lib/passEncry')
const randomize = require('randomatic')
const logger = require('./../lib/loger')
const event = require('events')
const eventemiter = new event.EventEmitter();
// node mailer
const nodemailer = require("nodemailer");
const crypto = require('crypto')
const tok = require('./../model/usersignuptoken')
const tokens = mongoose.model('token')


let getalluser = (req, res) => {
    usermodel.find().exec((err, result) => {
        if (err) {
            logger.error('error while feting user', 'getalluser()', 10)
            let response = api.apiresponse(true, 'error while feting user', 500, null)
            res.send(response)
        } else if (emptycheck.emptyCheck(result)) {
            logger.error('while feting user is blank', 'getalluser()', 10)
            let response = api.apiresponse(true, 'while feting user is blank', 404, null)
            res.send(response)
        } else {
            logger.info('fetched user details', 'getalluser()')
            let response = api.apiresponse(false, 'while feting user is blank', 200, result)
            res.send(response)
        }
    })
}


module.exports={
    getalluser:getalluser
}