const express = require('express')
const app = express()
const signup = require('./../controller/signup')
const login = require('./../controller/login')

let route = (app) => {

    // user signup
    app.post('/usersignup', signup.usersignup)
    //user login
    app.post('/userlogin',login.userlogin)
}

module.exports={
    route:route
}