const express = require('express')
const app = express()
const signup = require('./../controller/signup')
const login = require('./../controller/login')
const adminsign = require('./../controller/adminusersignup')
const adminlogin = require('./../controller/loginadmin')
const getall = require('./../controller/getalluser')

let route = (app) => {

    // user signup
    app.post('/usersignup', signup.usersignup)
    //user login
    app.post('/userlogin', login.userlogin)

    // admin signup
    app.post('/adminsignup', adminsign.usersignupadmin)
    app.post('/adminlogin', adminlogin.adminlogin)
    // get all user
    app.get('/getalluser',getall.getalluser)
}

module.exports = {
    route: route
}