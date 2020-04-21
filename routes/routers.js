const express = require('express')
const app = express()
const signup = require('./../controller/signup')
const login = require('./../controller/login')
const adminsign = require('./../controller/adminusersignup')
const adminlogin = require('./../controller/loginadmin')

let route = (app) => {

    // user signup
    app.post('/usersignup', signup.usersignup)
    //user login
    app.post('/userlogin', login.userlogin)

    // admin signup
    app.post('/adminsignup', adminsign.usersignupadmin)
    app.post('/adminlogin', adminlogin.adminlogin)
}

module.exports = {
    route: route
}