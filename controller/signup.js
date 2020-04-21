const signupuser = require('./../model/Signup')
const mongoose = require('mongoose')
const usermodel = mongoose.model('userinfo')
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

eventemiter.on('welcomemail', (resolve) => {
    console.log(resolve)
    async function main(req, res) {

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'chakladar.sandeep3@gmail.com', //add user password
                pass: 'examidea123'
            }
        });


        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" chakladar.sandeep3@gmail.com', // sender address
            to: resolve.email, // list of receivers
            subject: "Account Verification Token", // Subject line
            text: `Hello,\n\n'Please verify your account by clicking the link: \nhttp:\/\/' +  + '\/confirmation\/' + token.token + '.\n' `, // plain text
            html: ""// html body
            // ${req.headers.host}
        });
        console.log(`mail is sent successfullt to ${email}`)

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);



})
// user registration

let usersignup = (req, res) => {
    // email id is proper format check eg having @ and "." 
    let emailcheck = () => {
        return new Promise((resolve, reject) => {

            let regex = /^[a-zA-z]+\W?\w+\W+[a-z]+\W+\w+/
            if ((req.body.email).match(regex)) {
                logger.info('Email ID is in correct format', 'signup:emailcheck()')
                let response = api.apiresponse(false, 200, 'Email ID is in correct format', null)
                resolve(response)
            } else {
                logger.error('Email ID is not in correct format', 'signup:emailcheck()', 10)
                let response = api.apiresponse(true, 500, 'Email ID is not in correct format', null)
                reject(response)
            }
        })
    }

    let userexist = () => {
        return new Promise((resolve, reject) => {
            usermodel.find({ email: req.body.email }).exec((err, result) => {

                if (err) {
                    logger.error('something went wrong', 'signup:userexist()', 10)
                    let response = api.apiresponse(true, 404, 'something went wrong', null)
                    reject(response)
                } else if (emptycheck.emptyCheck(result)) {
                    logger.info('new user', 'signup:userexist()')
                    let response = api.apiresponse(false, 200, 'new user', null)
                    resolve(response)
                } else {
                    logger.error('email id is already present', 'signup:userexist()', 10)
                    let response = api.apiresponse(true, 500, 'email id is already present', null)
                    reject(response)
                }
            })
        })
    }
    // check for password 
    let passcheck = () => {
        return new Promise((resolve, reject) => {
            let regex = /^[a-zA-Z]+\d+/
            let pass = req.body.password;
            // console.log(pass)
            if (pass.match(regex) && (pass.length >= 6)) {
                // console.log(pass)
                let response = api.apiresponse(false, 200, "password passed the check", null)
                resolve(response)
            } else {
                let response = api.apiresponse(true, 500, 'password doesn\'t pass the criteria', null)
                reject(response)
            }

        })
    }

    // Save data

    let datasave = () => {
        return new Promise((resolve, reject) => {
            usermodel.find({ mobilenumber: req.body.mobilenumber }).exec((err, result) => {
                if (err) {
                    let response = api.apiresponse(true, 404, 'something went wrong', null)
                    reject(response)
                } else if (emptycheck.emptyCheck(result)) {
                    let userid = randomize('Aa0', 4)
                    let valid = 1
                    let datastore = new usermodel({
                        userid: userid,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        password: pass.passhash(req.body.password),
                        mobilenumber: req.body.mobilenumber,
                        email: req.body.email,
                        valid: valid,
                        country: req.body.country,
                        createdom: Date.now()
                    })

                    datastore.save((error, data) => {
                        if (error) {
                            let response = api.apiresponse(true, 500, 'Something went wrong while saving user data', null)
                            reject(response)
                        } else if (emptycheck.emptyCheck(data)) {
                            let response = api.apiresponse(true, 404, 'blank data received while saving user data', null)
                            reject(response)
                        } else {
                            resolve(data)
                           
                        }
                    })

                } else {
                    let response = api.apiresponse(true, 500, 'user already exist', null)
                    reject(response)
                }
            })
        })
    }

    emailcheck(req, res).then(userexist).then(passcheck).then(datasave).then((resolve) => {
        // console.log(resolve)

        logger.info('User signup successfully', 'signup()')
        setTimeout(() => {
            eventemiter.emit('welcomemail', ((resolve).toString()))
        }, 1000);
        let response = api.apiresponse(false, 200, 'User signup successfully', resolve)
        res.send(response)
    }).catch((err) => {
        logger.error('User didn\'t signup successfully', 'signup()', 5)
        // console.log(err)
        res.send(err)
    })
}

module.exports = {
    usersignup: usersignup
}