const mongoose = require('mongoose');
const randomize = require('randomatic');
const time = require('./../lib/timeLib');
const passwordLib = require('./../lib/passwordLib');
const response = require('./../lib/responseLib')
const logger = require('./../lib/loger');
const validateInput = require('../lib/paramsValidationLib')
const check = require('../lib/checkLib')
const token = require('../lib/tokenLib')
const au = require('../models/AuthModel')
const AuthModel = mongoose.model('Auth')
const userdd = require('../models/UserModel')
const UserModel = mongoose.model('User')
const emailSend = require('../lib/emailSend')

// signup for normal user
let signUpFunction = (req, res) => {
    // validating user's input (email and pass)
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    logger.error('Email is not in correct format', 'emailValid:validateUserInput()', 10)
                    let apiResponse = response.generate(true, 'Email is not in correct format', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    logger.error('password can\'t be blank', 'passcheck:validateUserInput()', 10)
                    let apiResponse = response.generate(true, 'password can\'t be blank', 400, null)
                    reject(apiResponse)
                } else {
                    logger.info('Email and pass is in correct format', 'validateUserInput() success')
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'validateUserInput() failed', 5)
                let apiResponse = response.generate(true, 'Field Missing During User Creation', 400, null)
                reject(apiResponse)
            }
        })
    } //ends here
    // creating new user
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email }).exec((err, resultdata) => {
                if (err) {
                    logger.error('Field Missing During User Creation', 'createUser() failed', 10)
                    let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(resultdata)) {
                    console.log(req.body)
                    let userid = randomize('aA0', 6)
                    let newuser = new UserModel({
                        userId: userid,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName || '',
                        email: req.body.email.toLowerCase(),
                        isAdmin: req.body.isAdmin,
                        userName:req.body.userName,
                        mobileNumber: req.body.mobileNumber,
                        password: passwordLib.hashpassword(req.body.password),
                        countryName: req.body.countryName,
                        countryCode: req.body.countryCode,
                        createdOn: time.now()
                    })
                    newuser.save((err, newuser) => {
                        if (err) {
                            logger.error(err.message, 'createUser stage-1', 10)
                            let apiResponse = response.generate(true, 'Failed to create new user something went wrong', 500, null)
                            reject(apiResponse)
                        } else if (check.isEmpty(newuser)) {
                            logger.error(err.message, 'createUser() stage-2 blank data received', 10)
                            let apiResponse = response.generate(true, 'Failed to create new user something went wrong', 500, null)
                            reject(apiResponse)
                        }
                        else {
                            logger.info('new user created successfully', 'createUser() success')
                            let newUserObj = newuser.toObject();
                            resolve(newUserObj)
                            emailSend.emailSend(newuser.email, 'Welcome To the Meeting application')
                        }
                    })
                } else {
                    logger.error('User\'s account is present, please login', 'userController: createUser', 10)
                    let apiResponse = response.generate(true, 'User\'s account is present, please login', 403, null)
                    reject(apiResponse)
                }
            })
        })
    } // end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'user created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}
// Login user starts here
let loginFunction = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({
                    email: req.body.email
                }, ((err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(userDetails)
                    }
                }));

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (resultdata) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, resultdata.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = resultdata.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Invalid Password', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({
                userId: tokenDetails.userId
            }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
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
                            console.log(err)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
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
                            console.log(err)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
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

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}

let logout = (req, res) => {
    AuthModel.findOneAndRemove({
        userId: req.params.userId
    }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 401, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })
}

let forgotPassword = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.email)) {
                let apiResponse = response.generate(true, 'email is required', 400, null)
                reject(apiResponse)
            } else {
                resolve(req)
            }
        })
    }
    let sendResetPasswordLink = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({
                email: req.body.email
            }, (err, result) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to find user', 401, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'No user found', 404, null)
                    reject(apiResponse)
                } else {
                    emailSend.emailSend(result.email, `<a href='http://takgranites.com/resetPassword/${result.userId}'>Click here to reset password</a>`)
                    let apiResponse = response.generate(false, 'Email sent successfully to reset the password', 200, 'email sent')
                    resolve(apiResponse)
                }
            })
        })
    }
    validateUserInput(req, res)
        .then(sendResetPasswordLink)
        .then((resolve) => {
            let apires = response.generate(false, 'email send successfully for password reset', 200, resolve)
            res.send(apires)
        }).catch((err) => {
            let apiResponse = response.generate(true, 'internal server error', 500, null)
            res.send(apiResponse)
        })
}

let resetPassword = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.userId) {
                UserModel.findOne({
                    userId: req.body.userId
                }, (err, userDetails) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'Failed to find user', 401, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        console.log(userDetails)
                        let apiResponse = response.generate(true, 'No details found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(userDetails)
                    }
                })
            } else {
                let apiResponse = response.generate(true, 'UserID parameter missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let updatePassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.password)) {
                let apiResponse = response.generate(true, 'password cannot be empty', 400, null)
                reject(apiResponse)
            } else {
                UserModel.update({
                    userId: req.body.userId
                }, {
                    password: passwordLib.hashpassword(req.body.password)
                }, {
                    multi: true
                }, (err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'Failed to change password', 409, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        let apiResponse = response.generate(true, 'User not found', 404, null)
                        reject(apiResponse)
                    } else {
                        emailSend.emailSend(userDetails.email, `User with name as <b>${userDetails.firstName} ${userDetails.lastName} ,your password is successfully changed</b>`)
                        let apiResponse = response.generate(false, 'password changed successfully', 200, 'password changed successfully')
                        resolve(apiResponse)
                    }
                })
            }
        })
    }
    findUser(req, res)
        .then(updatePassword)
        .then((resolve) => {
            res.status(200)
            let apiResponse = response.generate(false, 'email successfully reset', 200, resolve)
            console.log(apiResponse)
            res.end(apiResponse)
        }).catch((err) => res.send(err))
}

let getAllUsers = (req, res) => {
    UserModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}

let deleteUser = (req, res) => {

    UserModel.findOneAndRemove({ 'userId': req.params.userId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: deleteUser', 10)
            let apiResponse = response.generate(true, 'Failed To delete user', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: deleteUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the user successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user

let getSingleUser = (req, res) => {
    UserModel.findOne({ 'userId': req.params.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            console.log(`user id is` + req.params.userId)
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user

let editUser = (req, res) => {

    let options = req.body;
    UserModel.update({ 'userId': req.params.userId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update


}// end edit user

module.exports = {
    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    getAllUsers: getAllUsers,
    editUser: editUser,
    deleteUser: deleteUser,
    getSingleUser: getSingleUser
}
