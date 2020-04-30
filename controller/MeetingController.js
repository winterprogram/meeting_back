const mongoose = require('mongoose');
const randomize = require('randomatic');
const time = require('./../lib/timeLib');
const response = require('./../lib/responseLib')
const check = require('../lib/checkLib')
const au = require('./../models/AuthModel')
const AuthModel = mongoose.model('Auth')
const userm = require('./../models/UserModel')
const UserModel = mongoose.model('User')
const meets = require('../models/MeetingModel')
const MeetingModel = mongoose.model('Meeting')
const event = require('events')
const eventemiter = new event.EventEmitter();
// node mailer
const nodemailer = require("nodemailer");

eventemiter.on('welcomemail', (email ,content) => {
    console.log(email ,content)
    async function main() {

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'chakladar.sandeep.14et1151@gmail.com', //add user password
                pass: 'examidea123'
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" ', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: content // html body
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



let createMeeting = (req, res) => {
  let validateUserInput = () => {
    return new Promise((resolve, reject) => {
      if (req.body.title && req.body.startDate && req.body.endDate &&
        req.body.createdBy && req.body.createdByEmail && req.body.createdById &&
        req.body.createdFor && req.body.createdForEmail && req.body.location && req.body.purpose) {
        resolve(req)
      } else {
        let apiResponse = response.generate(true, 'some fields are empty', 400, null)
        reject(apiResponse)
      }
    })
  }
  let addThisMeeting = () => {
    return new Promise((resolve, reject) => {
      let newMeeting = new MeetingModel({
        meetingId:randomize('Aa0',6),
        title: req.body.title,
        startDate: req.body.endDate,
        endDate: req.body.endDate,
        createdBy: req.body.createdBy,
        createdById: req.body.createdById,
        createdByEmail: req.body.createdByEmail,
        createdFor: req.body.createdFor,
        createdForEmail: req.body.createdForEmail,
        location:req.body.location,
        purpose:req.body.purpose,
        createdOn: time.now(),
      })
      newMeeting.save((err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'failed to save the meeting details', 417, null)
          reject(apiResponse)
        } else {
          let newMeetingObj = result.toObject()
          setTimeout(() => {
            eventemiter.emit('welcomemail', ((newMeetingObj.createdForEmail)),`<b>${newMeetingObj.createdByEmail} has set a meeting for you on ${newMeetingObj.startDate}.`)
        }, 1000)
          resolve(newMeetingObj)
        }
      })
    })
  }
  validateUserInput(req, res)
    .then(addThisMeeting)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'meeting created', 200, resolve)
      // console.log(apiResponse)
      res.send(apiResponse)
    }).catch(err => res.send(err))
}



let getSingleMeeting = (req, res) => {
  MeetingModel.find({
      meetingId: req.params.meetingId
    })
    .select()
    .lean()
    .exec((err, meetingDetails) => {
      if (err) {
        let apiResponse = response.generate(true, 'Error finding meeting details', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(meetingDetails)) {
        let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
        res.send(apiResponse)
      } else {
        let apiResponse = response.generate(false, 'Meeting Found', 200, meetingDetails)
        res.send(apiResponse)
      }
    })
}

/** function to display all meeting on ngOnInit */

let getAllMeetings = (req, res) => {
  let findUser = () => {
    return new Promise((resolve, reject) => {
      UserModel.find({
        userId: req.params.userId
      }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(false, 'failed to find user', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(true, 'no user found', 404, null)
          reject(apiResponse)
        } else {
          resolve(result)
        }
      })
    })
  }
  let findMeeting = (result) => {
    return new Promise((resolve, reject) => {
      if (result.isAdmin == true) {
        MeetingModel.find({
            createdById: result.userId
          })
          .select('-__v -_id')
          .lean()
          .exec((err, meetings) => {
            if (err) {
              let apiResponse = response.generate(false, 'failed to find meetings', 500, null)
              reject(apiResponse)
            } else if (check.isEmpty(meetings)) {
              let apiResponse = response.generate(true, 'no meetings found', 404, null)
              reject(apiResponse)
            } else {
              resolve(meetings)
            }
          })
      } else {
        MeetingModel.find({
            createdFor: result.userId
          })
          .select('-__v -_id')
          .lean()
          .exec((err, meetings) => {
            if (err) {
              let apiResponse = response.generate(false, 'failed to find meetings', 500, null)
              reject(apiResponse)
            } else if (check.isEmpty(meetings)) {
              let apiResponse = response.generate(true, 'no meetings found', 404, null)
              reject(apiResponse)
            } else {
              resolve(meetings)
            }
          })
      }
    })
  }
  findUser(req, res)
    .then(findMeeting)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'all meetings found', 200, resolve)
      res.send(apiResponse)
    }).catch((err) => res.send(err))
}



let getSelectedUserMeetings = (req, res) => {
  let validateParams = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.query.createdById) || check.isEmpty(req.query.createdFor)) {
        let apiResponse = response.generate(true, 'parameters missing', 403, null)
        reject(apiResponse)
      } else {
        resolve()
      }
    })
  }
  let findMeetings = () => {
    return new Promise((resolve, reject) => {
      let findQuery = {
        $or: [{
          $and: [{
              createdById: req.query.createdById
            },
            {
              createdFor: req.query.createdFor
            }
          ]
        }, {
          $and: [{
              createdFor: req.query.createdFor
            },
            {
              createdById: req.query.createdById
            }
          ]
        }]
      }
      MeetingModel.find(findQuery)
        .select('-_id -__v')
        .lean()
        .exec((err, result) => {
          if (err) {
            let apiResponse = response.generate(true, 'error while finding meetings', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'no meetings found for selected user', 404, null)
            reject(apiResponse)
          } else {
            resolve(result)
          }
        })
    })
  }
  validateParams()
    .then(findMeetings)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'all meetings found', 200, resolve)
      res.send(apiResponse)
    }).catch((err) => res.send(err))
}



let updateMeeting = (req, res) => {
  let findMeetings = () => {
    return new Promise((resolve, reject) => {
      MeetingModel.find({
        meetingId: req.params.meetingId
      }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'error finding meeting', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(true, 'failed to find meeting', 404, null)
          reject(apiResponse)
        } else {
          resolve(result)
        }
      })
    })
  }
  let update = (result) => {
    return new Promise((resolve, reject) => {
      let options = req.body
      MeetingModel.updateOne({
        meetingId: req.params.meetingId
      }, options, (err, result1) => {
        if (err) {
          let apiResponse = response.generate(true, 'failed to update meeting', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result1)) {
          let apiResponse = response.generate(true, 'error finding meeting', 404, null)
          reject(apiResponse)
        } else {
          let meeting = result
          setTimeout(() => {
            eventemiter.emit('welcomemail', ((meeting.createdForEmail)),`Hi, your meeting has been rescheduled on ${meeting.startDate}.`)
        }, 1000)
         
          resolve(result1)
        }
      })
    })
  }
  findMeetings()
    .then(update)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'updated successfully', 200, resolve)
      res.send(apiResponse)
    }).catch((err) => res.send(err))
}



let getNormalMeetingsOnInit = (req, res) => {
  let validateUserInput = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.userId)) {
        let apiResponse = response.generate(true, 'userID parameter is missing', 401, null)
        reject(apiResponse)
      } else {
        resolve(req)
      }
    })
  }
  let findUser = (req) => {
    return new Promise((resolve, reject) => {
      UserModel.find({
        userId: req.params.userId
      }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'error finding user', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(true, 'failed to find user details', 404, null)
          reject(apiResponse)
        } else {
          resolve(result)
        }
      })
    })
  }
  let findMeetings = (result) => {
    if (result.isAdmin == false) {
      return new Promise((resolve, reject) => {
        MeetingModel.find({
            createdFor: result.userId
          })
          .select()
          .lean()
          .exec((err, result1) => {
            if (err) {
              let apiResponse = response.generate(true, 'error finding meetings', 500, null)
              reject(apiResponse)
            } else if (check.isEmpty(result)) {
              let apiResponse = response.generate(true, 'failed to find meeting', 404, null)
              reject(apiResponse)
            } else {
              resolve(result1)
            }
          })
      })
    }
  }
  validateUserInput()
    .then(findUser)
    .then(findMeetings)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'meetings found', 200, resolve)
      res.send(apiResponse)
    }).catch((err) => res.send(err))
}



let deleteMeeting = (req, res) => {
  let findMeeting = () => {
    return new Promise((resolve, reject) => {
      MeetingModel.find({
        meetingId: req.params.meetingId
      }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'error finding meeting', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(true, 'failed to find meeting', 404, null)
          reject(apiResponse)
        } else {
          resolve(result)
        }
      })
    })
  }
  let deleteThisMeeting = (result) => {
    return new Promise((resolve, reject) => {
      MeetingModel.findOneAndRemove({
        meetingId: req.params.meetingId
      }, (err, result1) => {
        if (err) {
          let apiResponse = response.generate(true, 'error deleting meeting', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result1)) {
          let apiResponse = response.generate(true, 'failed to deleting meeting', 404, null)
          reject(apiResponse)
        } else {
          setTimeout(() => {
            eventemiter.emit('welcomemail', ((result.createdForEmail)),`<b>Meeting with title:${result.title} was deleted by ${result.createdBy}</b>`)
            eventemiter.emit('welcomemail', ((result.createdByEmail)),`<b>Meeting with title:${result.title} was deleted by ${result.createdBy}/You</b>`)
        }, 1000)
          resolve(result1)
        }
      })
    })
  }
  findMeeting()
    .then(deleteThisMeeting)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'meeting was successfully deleted', 200, resolve)
      res.send(apiResponse)
    }).catch((err) => res.send(err))
}




module.exports = {
  createMeeting: createMeeting,
  getSingleMeeting: getSingleMeeting,
  getSelectedUserMeetings: getSelectedUserMeetings,
  getAllMeetings: getAllMeetings,
  updateMeeting: updateMeeting,
  getNormalMeetingsOnInit: getNormalMeetingsOnInit,
  deleteMeeting: deleteMeeting
}