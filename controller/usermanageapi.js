const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../lib/timeLib');
const password = require('./../lib/passwordLib');
const response = require('./../lib/responseLib')
const logger = require('./../lib/loger');
const validateInput = require('../lib/paramsValidationLib')
const check = require('./../lib/checkLib')
const token = require('./../lib/tokenLib')
const AuthModel = mongoose.model('Auth')
const userdatamodel = mongoose.model('User')
const emailSend = require('./../lib/emailSend')


let signupforall = (req, res) => {
    let uservalidinput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    logger.error('email didn\'t pass the regex', 'uservalidinput:signupforall()', 10)
                    let apiResponse = response.generate(true, 'email didn\'t pass the regex', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    logger.error('password can\'t be empty', 'uservalidinput:signupforall()', 10)
                    let apiResponse = response.generate(true, 'password can\'t be empty', 400, null)
                    reject(apiResponse)
                } else if (!validateInput.Password(req.body.password)) {
                    logger.error('password didn\'t match the regex', 'uservalidinput:signupforall()', 10)
                    let apiResponse = response.generate(true, 'password didn\'t match the regex', 400, null)
                    reject(apiResponse)
                } else {
                    logger.info('password and email matched regex', 'uservalidinput:signupforall()')

                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'uservalidinput: signupforall()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let saveuserdata = () => {
        return new Promise((resolve, reject) => {
            userdatamodel.find({ email: req.body.email }).exec((err, retrievedUserDetails) => {
                if (err) {
                    logger.error('error while saving data', 'saveuserdata: signupforall()', 5)
                    let apiResponse = response.generate(true, 'error while saving data', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedUserDetails)) {
                    console.log(req.body)
                    let newUser = new userdatamodel({
                        userId: shortid.generate(),
                        userName: req.body.userName,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName || '',
                        email: req.body.email.toLowerCase(),
                        isAdmin: req.body.isAdmin,
                        mobileNumber: req.body.mobileNumber,
                        password: password.hashpassword(req.body.password),
                        countryName: req.body.countryName,
                        countryCode: req.body.countryCode,
                        createdOn: time.now()
                    })
                    console.log(newUser);
                    newUser.save((err, newUser) => {
                        if (err) {
                            logger.error('error while saving data', 'saveuserdata: signupforall()', 5)
                            let apiResponse = response.generate(true, 'error while saving data', 500, null)
                            reject(apiResponse)
                        } else {
                            logger.info('user data saved', 'saveuserdata: signupforall()')
                            let newUserObj = newUser.toObject();
                            resolve(newUserObj)
                            emailSend.emailSend(newUser.email, 'Welcome To the Meeting application')
                        }
                    })
                } else {
                    logger.error('user already exist in db', 'saveuserdata: signupforall()', 5)
                    let apiResponse = response.generate(true, 'user already exist in db', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    uservalidinput(req, res).then(saveuserdata).then((resolve) => {
        delete resolve.password
        logger.info('user data saved - final', 'signupforall()')
        let apiResponse = response.generate(false, 'user data saved - final', 200, resolve)
        res.send(apiResponse)
    }).catch((err) => {
        logger.error('error while saving data', 'saveuserdata: signupforall()', 5)
        let apiResponse = response.generate(true, 'error while saving data', 500, null)
        console.log(err);
        res.send(apiResponse);
    })

}


let fetchalluser = (req, res) => {
    userdatamodel.find().select(' -__v -_id').lean().exec((err, result) => {
        if (err) {
            logger.error('', 'fetchalluser()', 10)
            let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.error('No User Found', 'fetchalluser()', 5)
            let apiResponse = response.generate(true, 'No Users Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('details fetched for all user', 'fetchalluser()')
            let apiResponse = response.generate(false, 'details fetched for all user', 200, result)
            res.send(apiResponse)
        }
    })
}
let deleteuserdata = (req, res) => {
    userdatamodel.deleteOne({ userId: req.params.userId }).exec((err, result) => {
        if (err) {
            logger.error('error while deleting user', 'deleteuserdata()', 10)
            let apiResponse = response.generate(true, 'Failed To delete user', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.error('user not found', 'deleteuserdata()', 10)
            let apiResponse = response.generate(true, 'user not found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('user deleted successfully', 'fetchalluser()')
            let apiResponse = response.generate(false, 'user deleted successfully', 200, result)
            res.send(apiResponse)
        }
    });


}

let singleuserdata = (req, res) => {
    userdatamodel.find({ userId: req.params.userId }).select('-password -__v -_id').lean().exec((err, result) => {  
        if (err) {  
            logger.error('error while fetching single user', 'singleuserdata()', 10)
            let apiResponse = response.generate(true, 'rror while fetching single user', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.error('error no user found', 'singleuserdata()',5)
            let apiResponse = response.generate(true, 'error no user found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('user found', 'singleuserdata()')
            let apiResponse = response.generate(false, 'user found', 200, result)
            res.send(apiResponse)
        }
    })
}


let loginforuser = (req, res) => {
    let userinfo = () => {
        return new Promise((resolve, reject) => {
            userdatamodel.find({ email: req.body.email }, ((err, userDetails) => {
                if (err) {
                    logger.error('error while fetchig user data', ' userinfo:loginforuser()', 10)
                    let apiResponse = response.generate(true, 'error while fetchig user data', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(userDetails)) {
                    logger.error('user not found', ' userinfo:loginforuser()', 5)
                    let apiResponse = response.generate(true, 'user not found', 404, null)
                    reject(apiResponse)
                } else {
                    logger.info('user found', ' userinfo:loginforuser()')
                    resolve(userDetails)
                }
            }));

        })
    }
    let verifypassword = (retrievedUserDetails) => {
        return new Promise((resolve, reject) => {
            password.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    logger.error('error while matching password', 'verifypassword:loginforuser()', 10)
                    let apiResponse = response.generate(true, 'error while matching password', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    logger.info('password verified', 'verifypassword:loginforuser()')
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.error('password didn\'t match', 'verifypassword:loginforuser()', 10)
                    let apiResponse = response.generate(true, 'password didn\'t match', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let genjwttoken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    logger.error('error while generating JWT token', 'genjwttoken:loginforuser()', 10)
                    let apiResponse = response.generate(true, 'error while generating JWT token', 500, null)
                    reject(apiResponse)
                } else {
                    logger.info('JWT token generated', 'genjwttoken:loginforuser()')
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let savejwt = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.find({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.error('error while save JWT token - 1', 'savejwt:loginforuser()', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error('error while saving JWT token', 'savejwt:loginforuser()', 10)
                            let apiResponse = response.generate(true, 'error while saving JWT token', 500, null)
                            reject(apiResponse)
                        } else {
                            logger.info('jwt saved', 'savejwt:loginforuser()')
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error('error while saving JWT token', 'savejwt:loginforuser()', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            logger.info('jwt saved', 'savejwt:loginforuser()')
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    userinfo(req, res).then(verifypassword).then(genjwttoken).then(savejwt).then((resolve) => {
        logger.info('user logedin successfully', 'loginforuser()')
        let apiResponse = response.generate(false, 'user logedin successfully', 200, resolve)
        res.status(200)
        res.send(apiResponse)
    }).catch((err) => {
        logger.error('error slogin', 'savejwt:loginforuser()', 10);
        let apiResponse = response.generate(true, 'error login', 500, null)
        console.log(err);
        res.send(apiResponse)
    })
}

let logout = (req, res) => {
    AuthModel.deleteOne({ userId: req.params.userId }, (err, result) => {
        if (err) {
            logger.error('error while loging out', 'logout()', 10);
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 401, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.error('error received blank data', 'logout()', 10)
            let apiResponse = response.generate(true, 'error received blank data', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('user logged out', 'logout()')
            let apiResponse = response.generate(false, 'user logged out', 200, null)
            res.send(apiResponse)
        }
    })
}

let forgotpassword = (req, res) => {
    let uservalidinput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.email)) {
                logger.error('email can\'t be empty', 'uservalidinput:forgotpassword()', 10)
                let apiResponse = response.generate(true, 'email can\'t be empty', 400, null)
                reject(apiResponse)
            } else {
                logger.info('email found', 'uservalidinput:forgotpassword()')
                resolve(req)
            }
        })
    }
    let sendlink = () => {
        return new Promise((resolve, reject) => {
            userdatamodel.find({ email: req.body.email }, (err, result) => {
                if (err) {
                    logger.error('error while fining user', 'sendlink:forgotpassword()', 10)
                    let apiResponse = response.generate(true, 'error while fining user', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.error('error user not found', 'sendlink:forgotpassword()', 10)
                    let apiResponse = response.generate(true, 'error user not found', 404, null)
                    reject(apiResponse)
                } else {
                    logger.info('link send to user', 'sendlink:forgotpassword()')
                    emailSend.emailSend(result.email, `<a href='http://15.206.28.103/forgotpassword/${result.userId}'>Click here to reset password</a>`)
                    let apiResponse = response.generate(false, 'link send to user', 200, null)
                    resolve(apiResponse)
                }
            })
        })
    }
    uservalidinput(req, res).then(sendlink).then((resolve) => {
        logger.info('link send to user', 'sendlink:forgotpassword()')
        let apiResponse = response.generate(false, 'email send successfully for password reset', 200, resolve)
        res.send(apiResponse)
    }).catch((err) => {
        logger.error('error mail didb\'t share', 'sendlink:forgotpassword()', 10)
        let apiResponse = response.generate(true, 'error mail didb\'t share', 500, null)
        res.send(apiResponse)
    })
}



let edituserdata = (req, res) => {

    let newdata = req.body;
    userdatamodel.updateOne({ userId: req.params.userId }, newdata).exec((err, result) => {
        if (err){
            logger.error('error while updating user data', 'edituserdatadata()', 10)
            let apiResponse = response.generate(true, 'error while updating user data', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.error('error user not found', 'edituserdata()',10)
            let apiResponse = response.generate(true, 'error user not found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('user data edited successfully', 'edituserdata()')
            let apiResponse = response.generate(false, 'user data edited successfully', 200, result)
            res.send(apiResponse)
        }
    });


}

module.exports = {
    signupforall: signupforall,
    loginforuser: loginforuser,
    logout: logout,
    forgotpassword: forgotpassword,
    fetchalluser: fetchalluser,
    edituserdata: edituserdata,
    deleteuserdata: deleteuserdata,
    singleuserdata: singleuserdata
}
