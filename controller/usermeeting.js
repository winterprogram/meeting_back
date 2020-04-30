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
const auth = mongoose.model('Auth')
const userdd = require('../models/UserModel')
const userm = mongoose.model('User')
const event = require('events')
const eventemiter = new event.EventEmitter();
// node mailer
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');
let SENDGRID_API_KEY;
eventemiter.on('welcomemail', (email ,content) => {

    // const sgMail = require('@sendgrid/mail');
     SENDGRID_API_KEY = `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`
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'noreply@test.com',
      subject: 'Meeting App email',
      text: 'and easy to do anywhere, even with Node.js',
      html: content,
    };
    sgMail.send(msg);

    console.log(email ,content)
    // async function main() {

    //     let testAccount = await nodemailer.createTestAccount();

    //     let transporter = nodemailer.createTransport({
    //         host: 'smtp.gmail.com',
    //         port: 587,
    //         secure: false,
    //         auth: {
    //             user: 'chakladar.sandeep.14et1151@gmail.com', //add user password
    //             pass: 'examidea123'
    //         }
    //     });

    //     // send mail with defined transport object
    //     let info = await transporter.sendMail({
    //         from: '"Fred Foo 👻" ', // sender address
    //         to: email, // list of receivers
    //         subject: "Hello ✔", // Subject line
    //         text: "Hello world?", // plain text body
    //         html: content // html body
    //     });
    //     console.log(`mail is sent successfullt to ${email}`)

    //     console.log("Message sent: %s", info.messageId);
    //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //     // Preview only available when sending through an Ethereal account
    //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    // }

    // main().catch(console.error);
})

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
            userm.find({ email: req.body.email }).exec((err, resultdata) => {
                if (err) {
                    logger.error('Field Missing During User Creation', 'createUser() failed', 10)
                    let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(resultdata)) {
                    let regex = /^[a-zA-Z]+\d+/;
                    console.log(req.body)
                    if ((req.body.password).match(regex) && ((req.body.password).length >= 6)) {
                        let userid = randomize('aA0', 6)
                        let newuser = new userm({
                            userId: userid,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            isAdmin: req.body.isAdmin,
                            userName: req.body.userName,
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
                                setTimeout(() => {
                                    eventemiter.emit('welcomemail', ((newuser.email).toString()),`'Welcome To the Meeting application`)
                                }, 1000)
                            }
                        })
                    } else {
                        logger.error('entered password not in correct format', 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'password is not in correct format', 503, null)
                        reject(apiResponse)
                    }
                } else {
                    logger.error('User\'s account is present, please login', 'userController: createUser', 10)
                    let apiResponse = response.generate(true, 'Email id or mobile no. is present, please login', 403, null)
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
                userm.find({
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
                        logger.info('user found', 'userController: findUser()')
                        resolve(userDetails)
                    }
                }));

            } else {
                logger.error('email can\'t be blank', 'userController: findUser()', 10)
                let apiResponse = response.generate(true, 'email can\'t be blank', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (userDetails) => {
        console.log(userDetails)
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, userDetails[0].password, (err, isMatch) => {
                console.log(isMatch)
                if (err) {
                    logger.error('error while validating password', 'validatePassword()', 10)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    console.log(isMatch)
                    // let retrievedUserDetailsObj = userDetails.toObject()
                   let retrievedUserDetailsObj = userDetails[0]
                     retrievedUserDetailsObj.password =undefined
                     retrievedUserDetailsObj._id =undefined
                     retrievedUserDetailsObj.__v =undefined
                     retrievedUserDetailsObj.createdOn =undefined
                     retrievedUserDetailsObj.modifiedOn =undefined
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
        console.log(userDetails);
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    logger.error('error while generating token', 'generateToken()', 5)
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
            auth.find({
                userId: tokenDetails.userId
            }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.error(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new auth({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error('Failed To Generate authToken', 'newAuthToken()', 5)
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
                            logger.error('Failed To Generate authToken -2 ', 'newAuthToken()', 5)
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
    auth.deleteOne({
        userId: req.params.userId
    }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, `error : ${err.message}`, 401, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged out', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out done!!', 200, null)
            res.send(apiResponse)
        }
    })
}

let forgotPassword = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.email)) {
                let apiResponse = response.generate(true, 'email can\'t be empty', 400, null)
                reject(apiResponse)
            } else {
                resolve(req)
            }
        })
    }
    let sendResetPasswordLink = () => {
        return new Promise((resolve, reject) => {
            userm.find({
                email: req.body.email
            }, (err, result) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to find user', 401, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'No user found', 404, null)
                    reject(apiResponse)
                } else {
                    setTimeout(() => {
                        eventemiter.emit('welcomemail', ((result.email)),`<a href='http://15.206.28.103/resetPassword/${result.userId}'>Click here to reset password</a>`)
                    }, 1000)
                   
                    let apiResponse = response.generate(false, 'Email sent to reset password', 200, null)
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


let getAllUsers = (req, res) => {
    userm.find()
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

    userm.findAndRemove({ 'userId': req.params.userId }).exec((err, result) => {
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
            let apiResponse = response.generate(false, 'Deleted the user', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user

let getSingleUser = (req, res) => {
    userm.find({ 'userId': req.params.userId })
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
    userm.updateOne({ 'userId': req.params.userId }, options).exec((err, result) => {
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
    getAllUsers: getAllUsers,
    editUser: editUser,
    deleteUser: deleteUser,
    getSingleUser: getSingleUser
}
