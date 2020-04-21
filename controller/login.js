const express = require('express')
const app = express()
// to genearte userId
const randomize = require('randomatic')
// adding schema
const model = require('./../model/Signup')
const mongoose = require('mongoose')
const userslogin = require('./../model/Login')
const usermodel = mongoose.model('userinfo')
const logintoken = mongoose.model('usertoken')
// adding empty check 
const emptyCheck = require('./../lib/emptyCheck')
//adding api response structure 
const api = require('./../lib/apiresponse')
// adding password encry lib
const passencry = require('./../lib/passEncry')
const logger = require('./../lib/loger')
// events
const event = require('events')
const eventemiter = new event.EventEmitter();
// importing jwt token lib
const jwt = require('./../lib/jswt')

let userlogin = (req, res) => {

    let mobileDigitCheck = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body.email)
            if (emptyCheck.emptyCheck(req.body.email)) {
                logger.error('mobilenumber can\'t be empty','login:mobileDigitCheck()',10)
                let apis = api.apiresponse(true, 'mobilenumber can\'t be empty', 400, null)
                reject(apis)
            } else {
                let regex = /^[a-zA-z]+\W?\w+\W+[a-z]+\W+\w+/
                let mobile = req.body.email
                // console.log(mobile)
                if (mobile.match(regex)) {
                    logger.info('email passed the check','login:mobileDigitCheck()')
                    let response = api.apiresponse(false, 200, "email passed the check", null)
                    // console.log(mobile)
                    resolve(response)
                } else {
                    logger.error('email can\'t be empty','login:mobileDigitCheck()',10)
                    let response = api.apiresponse(true, 500, 'email doesn\'t pass', null)
                    reject(response)
                }
            }


        })
    }


    let userLoginFinal = () => {
        return new Promise((resolve, reject) => {
            usermodel.find({ email: req.body.email }).exec((err, data) => {
                // console.log(data[0].password)
                if (err) {
                    logger.error('error at last stage','login:userLoginFinal()',10)
                    let apis = api.apiresponse(true, 'error at last stage ', 500, null)
                    // send user to signup 
                    reject(apis)
                } else if (emptyCheck.emptyCheck(data)) {
                    logger.error('mobienumber doesn\'t exist please login','login:userLoginFinal()',10)
                    let apis = api.apiresponse(true, 'mobienumber doesn\'t exist please signup ', 500, null)
                    // send user to signup 
                    reject(apis)
                }
                else {
                    // console.log(data)

                    //   console.log(req.body.password)
                    passencry.passcheck(req.body.password, data[0].password, ((error, result) => {
                        // console.log(result)
                        if (error) {
                            logger.error('Something went wrong','login:userLoginFinal()',10)
                            let apis = api.apiresponse(true, 'Something went wrong', 500, null)
                            reject(apis)
                        } else if ((data[0].valid == 0)) {
                            logger.error('usermodel doesn\'t have right\'s to access','login:userLoginFinal()',10)
                            let apis = api.apiresponse(true, 'usermodel doesn\'t have right\'s to access', 503, null)
                            reject(apis)
                        }
                        else if(result == true) {
                            logger.info('password  match','login:userLoginFinal()')
                            let apis = api.apiresponse(false, 'password  match', 200, data)
                            resolve(apis)
                        }else{
                            logger.error('password didn\'t match / wrong password','login:userLoginFinal()',10)
                            let apis = api.apiresponse(true, 'password didn\'t match / wrong password', 404, null)
                            reject(apis)
                        }
                    }))
                }
            })

        }
        )
    }
    let jwtTokengen = (userData) => {
        return new Promise((resolve, reject) => {
            jwt.generateToken(userData, ((err, result) => {
                if (err) {
                    logger.error('Error while generating Jwt token stage','login:userLoginFinal()',10)
                    let response = api.apiresponse(true, 'Error while generating Jwt token stage', 500, null)
                    reject(response)
                } else if (emptyCheck.emptyCheck(result)) {
                    logger.error('data while generating jwt is vacant','login:userLoginFinal()',10)
                    let response = api.apiresponse(true, 'data while generating jwt is vacant', 404, null)
                    reject(response)
                }

                else {
                    // console.log(userData.data[0].userid)
                    logintoken.deleteOne({ userid: userData.data[0].userid }).exec((err, result) => {
                        if (err) {
                            logger.error('error while deleting the usermodel token','login:userLoginFinal()',10)
                            let response = api.apiresponse(true, 'error while deleting the usermodel token', 504, null)
                            reject(response)
                        } else if (emptyCheck.emptyCheck(result)) {
                            logger.error('error while deleting the usermodel token','login:userLoginFinal()',10)
                            let response = api.apiresponse(true, 'error while deleting the usermodel token', 400, null)
                            reject(response)
                        } else {
                            logger.info('data successfully deleted adding new one','login:userLoginFinal()')
                            let response = api.apiresponse(true, 'data successfully deleted adding new one', 200, result)
                            resolve(response)
                        }
                    })
                    result.userid = userData.data[0].userid
                    result.userData = userData.data[0]
                    let tok = new logintoken({
                        userid: result.userid,
                        authtoken: result.token,
                        secreatekey: result.tokensecreate,
                        // userinfo: (result.userData),
                        createdon: Date.now()
                    })
                    tok.save((error, authtokendetails) => {
                        if (error) {
                            logger.error('Error while storing Jwt token stage -2','login:userLoginFinal()',10)
                            let response = api.apiresponse(true, 'Error while storing Jwt token stage -2', 500, error)
                            reject(response)
                        } else if ((emptyCheck.emptyCheck(authtokendetails))) {
                            logger.error('Error while storing Jwt token empty data','login:userLoginFinal()',10)
                            let response = api.apiresponse(true, 'Error while storing Jwt token empty data', 404, null)
                            reject(response)
                        } else {
                            // let auth = authtokendetails.toObject()
                            //  console.log(authtokendetails)
                            logger.info('user token stored successfully 1st login','login:userLoginFinal()')
                            let a = api.apiresponse(true, 'user token stored successfully 1st login)', 403, authtokendetails)
                            resolve(a)
                        }
                    })
                    // console.log(result)
                    resolve(result)
                }
            }))
        })

    }


    mobileDigitCheck(req, res).then(userLoginFinal).then(jwtTokengen).then((resolve) => {
        // console.log(resolve.data[0])
        // resolve = resolve.data[0]
        resolve.userData._id = undefined
        resolve.userData.password = undefined
        resolve.userData.createdon = undefined
        resolve.userData.__v = undefined
        resolve.userData.dob = undefined
        // resolve.userData.mobilenumber = undefined
        // resolve.userData.email = undefined
        let apis = api.apiresponse(false, 'successful login', 200, resolve)
        res.send(apis)
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })

}

module.exports = {
    userlogin: userlogin
}