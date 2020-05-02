const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../lib/timeLib');
const response = require('../lib/responseLib')
const emailSend = require('../lib/emailSend')
const check = require('../lib/checkLib')
const logger = require('../lib/loger')
const auth = require('../models/AuthModel')
const user = require('../models/UserModel')
const meet = require('../models/MeetingModel')
const AuthModel = mongoose.model('Auth')
const UserModel = mongoose.model('User')
const meetingdata = mongoose.model('Meeting')



let meetingcreate = (req, res) => {

  
  let uservalidinput = () => {
    return new Promise((resolve, reject) => {
      if (req.body.title && req.body.startDate && req.body.endDate &&
        req.body.createdBy && req.body.createdByEmail && req.body.createdById &&
        req.body.createdFor && req.body.createdForEmail && req.body.location && req.body.purpose) {
        logger.info('input in non empty', 'uservalidinput:meetingcreate()')
        resolve(req)
      } else {
        logger.error('input is empty', 'uservalidinput:meetingcreate()', 10)
        let apiResponse = response.generate(true, 'input is empty', 400, null)
        reject(apiResponse)
      }
    })
  }
  let addmeeting = () => {
    return new Promise((resolve, reject) => {
      let setmeeting = new meetingdata({
        meetingId: shortid.generate(),
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        createdBy: req.body.createdBy,
        createdById: req.body.createdById,
        createdByEmail: req.body.createdByEmail,
        createdFor: req.body.createdFor,
        createdForEmail: req.body.createdForEmail,
        location: req.body.location,
        purpose: req.body.purpose,
        createdOn: time.now(),
      })
      setmeeting.save((err, result) => {
        if (err) {
          logger.error('error while saving meeting data', 'addmeeting()', 5)
          let apiResponse = response.generate(true, 'error while saving meeting data', 417, null)
          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          logger.error('error while saving meeting data, data is blank', 'addmeeting()', 5)
          let apiResponse = response.generate(true, 'error while saving meeting data, data is blank', 417, null)
          reject(apiResponse)
        }
        else {
          logger.info('data saved', 'addmeeting()')
          let setmeetingObj = result.toObject()
          emailSend.emailSend(setmeetingObj.createdForEmail, ` Your meeting is set on ${setmeetingObj.startDate} by ${setmeetingObj.createdByEmail}`)
          resolve(setmeetingObj)
        }
      })
    })
  }
  uservalidinput(req, res)
    .then(addmeeting)
    .then((resolve) => {
      logger.info('success meeting created', 'meetingcreate')
      let apiResponse = response.generate(false, 'success meeting created', 200, resolve)
      console.log(apiResponse)
      res.send(apiResponse)
    }).catch((err) => {
      logger.error('error while saving meeting data, data is blank', 'addmeeting()', 5)
      let apiResponse = response.generate(true, 'error while saving meeting data', 500, null)
      console.log(err)
      res.send(apiResponse)
    }
    )
}



let fetchallmeetings = (req, res) => {
  let userfetch = () => {
    return new Promise((resolve, reject) => {
      UserModel.find({ userId: req.params.userId }, (err, result) => {
        if (err) {
          logger.error('error while finding user', 'userfetch:fetchallmeetings()', 10)
          let apiResponse = response.generate(false, 'error while finding user', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          logger.error('error user doesn\'t exist in db', 'userfetch:fetchallmeetings()', 10)
          let apiResponse = response.generate(true, 'error user doesn\'t exist in db', 404, null)
          reject(apiResponse)
        } else {
          logger.info('user exists in db', 'userfetch:fetchallmeetings()')
          resolve(result)
        }
      })
    })
  }
  let getmeeting = (result) => {
    return new Promise((resolve, reject) => {
      if (result.isAdmin == true) {
        meetingdata.find({ createdById: result.userId }).select('-__v -_id').lean().exec((err, meetings) => {
          if (err) {
            logger.error('meeting not found', 'getmeeting:fetchallmeetings()', 10)

            let apiResponse = response.generate(false, 'meeting not found', 500, null)

            reject(apiResponse)
          } else if (check.isEmpty(meetings)) {
            logger.error('meeting not found', 'getmeeting:fetchallmeetings()', 10)

            let apiResponse = response.generate(true, 'no meetings found', 404, null)
            reject(apiResponse)
          } else {
            logger.info('meetingnfound', 'getmeeting:fetchallmeetings()')

            resolve(meetings)
          }
        })
      } else {
        meetingdata.findOne({ createdFor: result.userId }).select('-__v -_id').lean().exec((err, meetings) => {
          if (err) {
            logger.error('meeting not found', 'getmeeting:fetchallmeetings()', 10)

            let apiResponse = response.generate(false, 'failed to find meetings', 500, null)

            reject(apiResponse)
          } else if (check.isEmpty(meetings)) {
            logger.error('meeting not found', 'getmeeting:fetchallmeetings()', 10)

            let apiResponse = response.generate(true, 'no meetings found', 404, null)

            reject(apiResponse)
          } else {
            logger.info('meetingnfound', 'getmeeting:fetchallmeetings()')

            resolve(meetings)
          }
        })
      }
    })
  }
  userfetch(req, res).then(getmeeting).then((resolve) => {
    logger.info('meetingn found - final', 'fetchallmeetings()')
    let apiResponse = response.generate(false, 'meetingn found - final', 200, resolve)
    res.send(apiResponse)
  }).catch((err) => {
    logger.error('meeting not found - final', 'getmeeting:fetchallmeetings()', 10)
    let apiResponse = response.generate(true, 'error meeting not found - final', 500, null)
    console.log(err)
    res.send(apiResponse)
  })
}



let fetchmeetingbyuser = (req, res) => {
  let validateParams = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.query.createdById) || check.isEmpty(req.query.createdFor)) {
        logger.error('error parameters received are empty', 'validateParams:fetchmeetingbyuser()', 10)
        let apiResponse = response.generate(true, 'parameters empty', 403, null)
        reject(apiResponse)
      } else {
        logger.error('error parameters received are empty', 'validateParams:fetchmeetingbyuser()', 10)

        resolve()
      }
    })
  }
  let getmeetings = () => {
    return new Promise((resolve, reject) => {
      meetingdata.find({ $or: [{ $and: [{ createdById: req.query.createdById }, { createdFor: req.query.createdFor }] }, { $and: [{ createdFor: req.query.createdFor }, { createdById: req.query.createdById }] }] }).select('-_id -__v').lean().exec((err, result) => {
        if (err) {
          logger.error('error while finding meeying by user', 'getmeetings:fetchmeetingbyuser()', 10)

          let apiResponse = response.generate(true, 'error while finding meetings', 500, null)

          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          logger.error('meeting not found while finding meeting by user', 'getmeetings:fetchmeetingbyuser()', 10)

          let apiResponse = response.generate(true, 'meeting not found while finding meeting by user', 404, null)
          reject(apiResponse)
        } else {
          logger.info('meeting found while finding meeting by user', 'getmeetings:fetchmeetingbyuser()')

          resolve(result)
        }
      })
    })
  }
  validateParams().then(getmeetings).then((resolve) => {
    logger.info('meeting found while finding meeting by user - final', 'getmeetings:fetchmeetingbyuser()')
    let apiResponse = response.generate(false, 'meeting found while finding meeting by user - final', 200, resolve)
    res.send(apiResponse)
  }).catch((err) => {
    logger.error('error - meeting found while finding meeting by user - final', 'getmeetings:fetchmeetingbyuser()', 5)
    let apiResponse = response.generate(true, 'error - meeting found while finding meeting by user - final', 404, null)
    console.log(err)
    res.send(apiResponse)
  })
}



let updateusermeeting = (req, res) => {
  let getmeetingsbyuser = () => {
    return new Promise((resolve, reject) => {
      meetingdata.find({ meetingId: req.params.meetingId }, (err, result) => {
        if (err) {
          logger.error('error while finding meeting by meetingId', 'getmeetingsbyuser:updateusermeeting()', 10)

          let apiResponse = response.generate(true, 'error while finding meeting by meetingId', 500, null)

          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          logger.error('meeting data is empty while finding meeting by meetingId', 'getmeetingsbyuser:updateusermeeting()', 10)

          let apiResponse = response.generate(true, 'meeting data is empty while finding meeting by meetingId', 404, null)

          reject(apiResponse)
        } else {
          logger.info('meeting data is fetched while finding meeting by meetingId', 'getmeetingsbyuser:updateusermeeting()')

          resolve(result)
        }
      })
    })
  }
  let updatemeetinginfo = (result) => {
    return new Promise((resolve, reject) => {
      let options = req.body
      meetingdata.updateOne({ meetingId: req.params.meetingId }, options, (err, newmeetingdata) => {
        if (err) {
          logger.error('error meeting update failed', 'updatemeetinginfo:updateusermeeting()', 10)

          let apiResponse = response.generate(true, 'failed to update meeting', 500, null)

          reject(apiResponse)
        } else if (check.isEmpty(newmeetingdata)) {
          logger.error('error meeting data id empty', 'updatemeetinginfo:updateusermeeting()', 10)

          let apiResponse = response.generate(true, 'error meeting data id empty', 404, null)
          reject(apiResponse)
        } else {
          logger.info(' meeting data is saved', 'updatemeetinginfo:updateusermeeting()')

          emailSend.emailSend(result.createdForEmail, `Hi, your meeting has been rescheduled on ${result.startDate}`)
          resolve(newmeetingdata)
        }
      })
    })
  }
  getmeetingsbyuser(req, res).then(updatemeetinginfo).then((resolve) => {
    logger.info(' meeting data is saved', 'updatemeetinginfo:updateusermeeting()')

    let apiResponse = response.generate(false, 'updated successfully', 200, resolve)
    res.send(apiResponse)
  }).catch((err) => {
    logger.error('error meeting data not updated', 'updatemeetinginfo:updateusermeeting()', 5)
    let apiResponse = response.generate(true, 'error meeting data not updated', 500, null)
    console.log(err)
    res.send(apiResponse)

  })
}



let getmeetingbyuser = (req, res) => {
  let uservalidinput = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.userId)) {
        logger.error('userid is missing ', 'uservalidinput:getmeetingbyuser()', 10)
        let apiResponse = response.generate(true, 'userID parameter is missing', 401, null)
        reject(apiResponse)
      } else {
        logger.info('user is validated ', 'uservalidinput:getmeetingbyuser()')

        resolve(req)
      }
    })
  }
  let userfetch = (req) => {
    return new Promise((resolve, reject) => {
      UserModel.find({ userId: req.params.userId }, (err, result) => {
        if (err) {
          logger.error('error while finding user', 'uservalidinput:getmeetingbyuser()', 10)

          let apiResponse = response.generate(true, 'error finding user', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          logger.error('error userid is empty', 'uservalidinput:getmeetingbyuser()', 10)

          let apiResponse = response.generate(true, 'error userid is empty', 404, null)
          reject(apiResponse)
        } else {
          logger.info('user is fetched', 'uservalidinput:getmeetingbyuser()')

          resolve(result)
        }
      })
    })
  }
  let getmeetings = (result) => {
    if (result.isAdmin == false) {
      return new Promise((resolve, reject) => {
        meetingdata.find({ createdFor: result.userId }).select().lean().exec((err, result1) => {
          if (err) {
            logger.error('error while finding meetings by user', 'getmeetings:getmeetingbyuser()', 10)
            let apiResponse = response.generate(true, 'error finding meetings', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.error('error while finding meetings by user - 2', 'getmeetings:getmeetingbyuser()', 5)

            let apiResponse = response.generate(true, 'failed to find meeting', 404, null)
            reject(apiResponse)
          } else {
            logger.info('meeting fetched for user', 'getmeetings:getmeetingbyuser()')

            resolve(result1)
          }
        })
      })
    }
  }
  uservalidinput().then(userfetch).then(getmeetings).then((resolve) => {
    logger.info('meeting fetched for user - final', 'getmeetings:getmeetingbyuser()')

    let apiResponse = response.generate(false, 'meetings found for user', 200, resolve)
    res.send(apiResponse)
  }).catch((err) => {
    logger.error('error while finding meetings by user - final', 'getmeetings:getmeetingbyuser()', 5)
    let apiResponse = response.generate(true, 'error while finding meetings by user - final', 500, null)
    console.log(err)
    res.send(apiResponse)

  })
}


let selectmeeting = (req, res) => {
  meetingdata.find({ meetingId: req.params.meetingId }).select().lean().exec((err, userMeetingData) => {
    if (err) {
      logger.error('error meeting can\'t fetch', 'selectmeeting()', 10)
      let apiResponse = response.generate(true, 'error meeting can\'t fetch', 500, null)
      res.send(apiResponse)
    } else if (check.isEmpty(userMeetingData)) {
      logger.error('no meeting found for user', 'selectmeeting()', 5)
      let apiResponse = response.generate(true, 'no meeting found for user', 404, null)
      res.send(apiResponse)
    } else {
      logger.info('meeting fetched for user', 'selectmeeting()')
      let apiResponse = response.generate(false, 'meeting fetched for user', 200, userMeetingData)
      res.send(apiResponse)
    }
  })
}


let deletemeetingforuser = (req, res) => {
  let getmeeting = () => {
    return new Promise((resolve, reject) => {
      meetingdata.find({ meetingId: req.params.meetingId }, (err, result) => {
        if (err) {
          logger.error('error while finding meeting', 'getmeeting:deletemeetingforuser()', 10)
          let apiResponse = response.generate(true, 'error finding meeting', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          logger.error('error while finding meeting is empty ', 'getmeeting:deletemeetingforuser()', 5)

          let apiResponse = response.generate(true, 'failed to find meeting', 404, null)
          reject(apiResponse)
        } else {
          logger.info('meeting is fetched', 'getmeeting:deletemeetingforuser()')

          resolve(result)
        }
      })
    })
  }
  let deleteselectedmeeting = (result) => {
    return new Promise((resolve, reject) => {
      meetingdata.deleteOne({ meetingId: req.params.meetingId }, (err, data) => {
        if (err) {
          logger.error('error while deleting selected meeting', 'deleteselectedmeeting:deletemeetingforuser()', 10)

          let apiResponse = response.generate(true, 'error while deleting selected meeting', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(data)) {
          logger.error('error while deleting selected meeting data is blank', 'deleteselectedmeeting:deletemeetingforuser()', 5)

          let apiResponse = response.generate(true, 'error while deleting selected meeting data is blank', 404, null)
          reject(apiResponse)
        } else {
          logger.info('meeting is deteled', 'getmeeting:deletemeetingforuser()')
          setTimeout(() => {
            emailSend.emailSend(result.createdForEmail, `<b>Meeting with title:${result.title} was deleted by ${result.createdBy}</b>`)
          }, 1000)
          setTimeout(() => {
            emailSend.emailSend(result.createdByEmail, `<b>Meeting with title:${result.title} was deleted by ${result.createdBy}/You</b>`)
          }, 1000)

          resolve(data)
        }
      })
    })
  }
  getmeeting(req, res).then(deleteselectedmeeting).then((resolve) => {
    logger.info('meeting was deteled successfully', 'deletemeetingforuser()')

    let apiResponse = response.generate(false, 'meeting was deteled successfully', 200, resolve)
    res.send(apiResponse)
  }).catch((err) => {
    logger.error('error while deleting selected meeting data ', 'deletemeetingforuser()', 5)
    let apiResponse = response.generate(true, 'error while deleting selected meeting data', 500, null)
    
    console.log(err)
    res.send(apiResponse)

  })
}




module.exports = {
  meetingcreate: meetingcreate,
  selectmeeting: selectmeeting,
  fetchmeetingbyuser: fetchmeetingbyuser,
  fetchallmeetings: fetchallmeetings,
  updateusermeeting: updateusermeeting,
  getmeetingbyuser: getmeetingbyuser,
  deletemeetingforuser: deletemeetingforuser
}