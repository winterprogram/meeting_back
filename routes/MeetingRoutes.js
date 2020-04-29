const express = require('express');
const meetingController = require("../controller/MeetingController");
const appConfig = require("./../config/config")
const auth = require('../middleware/auth')

let setRouter = (app) => {
  

  // params: startDate, endDate, title, createdByEmail, createdBy, createdById, createdForEmail, createdFor, meetingId,location,purpose
  app.post(`/createMeeting`, auth.isAuthorized, meetingController.createMeeting);
  /**
   * @apiGroup meeting
   * @apiVersion 1.0.0
   * @api {post} /api/v1/meeting/createMeeting api to add meeting
   * 
   * @apiParam {string} title Title of the meeting (body param) (required)
   * @apiParam {date} startDate Start Date of Meeting (body param) (required)
   * @apiParam {date} endDate End of Meeting (body param) (required)
   * @apiParam {string} createdBy Name of the Admin who created meeting (body param) (required)
   * @apiParam {string} createdByEmail Email of the Admin who created the meeting (body param) (required)
   * @apiParam {string} createdById ID of the Admin who created the meeting (body param) (required)
   * @apiParam {string} createdFor ID of the Normal User for whom the meeting was created (body param) (required)
   * @apiParam {string} createdForEmail Email of the Normal user for whom the meeting was created (body param) (required)
   * @apiParam {string} location Location of the  meeting (body param) (required)
   * @apiParam {string} purpose Purpose of the meeting (body param) (required)
   * @apiParam {string} authToken Authorization Token(body param/header/query param) of the admin who created meeting (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * { 
     "error": false,
     "message": "meeting created",
     "status": 200,
     "data": {
            "createdBy": "vaibhav tak"
            "createdByEmail": "vaibhav.tak@xyz.com"
            "createdById": "-zGtGVXTk"
            "createdFor": "3zclPt-r7"
            "createdForEmail": "aman.garg@xyz.com"
            "createdOn": "2019-01-16T18:45:45.000Z"
            "endDate": "2019-01-18T05:00:05.000Z" 
            "location": "Room1"
            "meetingId": "jPOLNs4gd"
            "purpose": "Making Decisions"
            "startDate": "2019-01-18T05:00:05.000Z"
            "title": "Meeting1"
            "__v": 0
            "_id": "5c3f7bd9fdf17d172c3d9e47"
 
      } 
}
   */

  // params: title, startDate, endDate,location,purpose
  app.put(`/updateMeeting/:meetingId`, auth.isAuthorized, meetingController.updateMeeting)
  /**
   * @apiGroup meeting
   * @apiVersion 1.0.0
   * @api {put} /api/v1/meeting/updateMeeting/:meetingId api to update meeting
   * 
   * @apiParam {string} title Title of the meeting (body param) (required)
   * @apiParam {string} meetingId Meeting ID of the meeting
   * @apiParam {string} authToken Authorization Token(header/body param/query param) of the creator of the meeting (body param) (required)
   * @apiParam {date} startDate Start Date of the Meeting (body param) (required)
   * @apiParam {datw} endDate End Date of the Meeting (body param) (required)
   * @apiParam {string} location Location of the Meeting (body param) (required)
   * @apiParam {string} purpose Purpose of the Meeting (body param) (required)
   * 
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "updated successfully",
    "status": 200,
    "data": {
        "data": {n: 1, nModified: 1, ok: 1}
        "error": false
        "message": "updated successfully"
        "status": 200
    }
}
   */

  // params: userId
  app.get(`/allMeetings/:userId`, auth.isAuthorized, meetingController.getAllMeetings)
  /**
   * @apiGroup meeting
   * @apiVersion 1.0.0
   * @api {get} /api/v1/meeting/allMeetings/:userId api to fetch all meetings by admin
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the admin (body param) (required)
   * @apiParam {string} userId User ID of admin (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "all meetings found",
    "status": 200,
    "data": [
        {
            "createdBy": "vaibhav tak"
            "createdByEmail": "vaibhav.tak@xyz.com"
            "createdById": "-zGtGVXTk"
            "createdFor": "6wMgfOOf_"
            "createdForEmail": "shubham.tak@xyz.com"
            "createdOn": "2019-01-10T10:33:47.000Z"
            "end": Fri Jan 25 2019 16:03:16 GMT+0530 (India Standard Time) {}
            "endDate": "2019-01-25T10:33:16.000Z"
            "location": "ddds"
            "meetingId": "FBA5WvMbj"
            "purpose": "General Purpose"  
            "remindMe": true
            "start": Thu Jan 24 2019 16:03:16 GMT+0530 (India Standard Time) {}
            "startDate": "2019-01-24T10:33:16.000Z"
            "title": "meeting_dhingra"
        },
        {
            "createdBy": "vaibhav tak"
            "createdByEmail": "vaibhav.tak@xyz.com"
            "createdById": "-zGtGVXTk"
            "createdFor": "6wMgfOOf_"
            "createdForEmail": "shubham.tak@xyz.com"
            "createdOn": "2019-01-15T16:30:47.000Z"
            "end": Thu Jan 31 2019 22:00:33 GMT+0530 (India Standard Time) {}
            "endDate": "2019-01-31T16:30:33.000Z"
            "meetingId": "MbXDVAxrT"
            "remindMe": true
            "start": Thu Jan 31 2019 22:00:33 GMT+0530 (India Standard Time) {}
            "startDate": "2019-01-31T16:30:33.000Z"0
            "title": "s"
        }
    ]
}
   */

  // query params: createdById, createdForId
  app.get(`/getSelectedUserMeetings`, auth.isAuthorized, meetingController.getSelectedUserMeetings)
  /**
   * @apiGroup meeting
   * @apiVersion 1.0.0
   * @api {get} /api/v1/meeting/getMeetingOnClick api to get all meetings of a particular user on Click as admin
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the admin (body param) (required)
   * @apiParam {string} createdById User ID of admin (body param) (required)
   * @apiParam {string} createdForId User ID of normal user (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "all meetings found",
    "status": 200,
    "data": [
        {
            "createdBy": "vaibhav tak"
            "createdByEmail": "vaibhav.tak@xyz.com"
            "createdById": "-zGtGVXTk"
            "createdFor": "3zclPt-r7"
            "createdForEmail": "aman.garg@xyz.com"
            "createdOn": "2019-01-16T06:30:32.000Z"
            "end": Thu Jan 24 2019 12:00:15 GMT+0530 (India Standard Time) {}
            "endDate": "2019-01-24T06:30:15.000Z"
            "location": "dd"
            "meetingId": "MPJPakIZ-"
            "purpose": "Defects Status"
            "remindMe": true
            "start": Thu Jan 24 2019 12:00:15 GMT+0530 (India Standard Time) {}
            "startDate": "2019-01-24T06:30:15.000Z"
            "title": "dd"
        },
        {
            "createdBy": "vaibhav tak"
            "createdByEmail": "vaibhav.tak@xyz.com"
            "createdById": "-zGtGVXTk"
            "createdFor": "3zclPt-r7"
            "createdForEmail": "aman.garg@xyz.com"
            "createdOn": "2019-01-16T09:29:22.000Z"
            "end": Fri Jan 18 2019 14:59:09 GMT+0530 (India Standard Time) {}
            "endDate": "2019-01-18T09:29:09.000Z"
            "location": "jbjdbj"
            "meetingId": "4ufGx-0NL"
            "purpose": "Building Relationships"
            "remindMe": true
            "start": Fri Jan 18 2019 14:59:09 GMT+0530 (India Standard Time) {}
            "startDate": "2019-01-18T09:29:09.000Z"
            "title": "dkbd"
        }
    ]
}
   */

  // param: meetingId
  app.get(`/getSingleMeeting/:meetingId`, auth.isAuthorized, meetingController.getSingleMeeting)
  /**
   * @apiGroup meeting
   * @apiVersion 1.0.0
   * @api {get} /api/v1/meeting/getSingleMeeting/:meetingId api to get selected meeting
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the admin (body param) (required)
   * @apiParam {string} meetingId Meeting ID of the meeting (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "Meeting Found",
    "status": 200,
    "data": {
        "createdBy": "vaibhav tak"
        "createdByEmail": "vaibhav.tak@xyz.com"
        "createdById": "-zGtGVXTk"
        "createdFor": "3zclPt-r7"
        "createdForEmail": "aman.garg@xyz.com"
        "createdOn": "2019-01-16T18:45:45.000Z"
        "endDate": "2019-01-18T05:00:05.000Z"
        "location": "Room1"
        "meetingId": "jPOLNs4gd"
        "purpose": "Making Decisions"
        "startDate": "2019-01-18T05:00:05.000Z"
        "title": "Meeting1"
        "__v": 0  
        "_id": "5c3f7bd9fdf17d172c3d9e47"
    }
}
   */

  // param: userId
  app.get(`/getNormalMeetings/:userId`, auth.isAuthorized, meetingController.getNormalMeetingsOnInit)
  /**
   * @apiGroup meeting
   * @apiVersion 1.0.0
   * @api {get} /api/v1/meeting/getNormalMeetings/:userId api to fetch all meetings of normal user
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the normal user (body param) (required)
   * @apiParam {string} userId User Id of normal user (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "all meetings found",
    "status": 200,
    "data": [
        {
            "createdBy": "vaibhav tak"
            "createdByEmail": "vaibhav.tak@xyz.com"
            "createdById": "-zGtGVXTk"
            "createdFor": "3zclPt-r7"
            "createdForEmail": "aman.garg@xyz.com"
            "createdOn": "2019-01-16T06:30:32.000Z"
            "end": Thu Jan 24 2019 12:00:15 GMT+0530 (India Standard Time) {}
            "endDate": "2019-01-24T06:30:15.000Z"
            "location": "dd"
            "meetingId": "MPJPakIZ-"
            "name": "vaibhav tak"
            "purpose": "Defects Status"
            "remindMe": true
            "start": Thu Jan 24 2019 12:00:15 GMT+0530 (India Standard Time) {}
            "startDate": "2019-01-24T06:30:15.000Z"
            "title": "dd"
        },
        {
            "createdBy": "vaibhav tak"
            "createdByEmail": "vaibhav.tak@xyz.com"
            "createdById": "-zGtGVXTk"
            "createdFor": "3zclPt-r7"
            "createdForEmail": "aman.garg@xyz.com"
            "createdOn": "2019-01-16T09:29:22.000Z"
            "end": Fri Jan 18 2019 14:59:09 GMT+0530 (India Standard Time) {}
            "endDate": "2019-01-18T09:29:09.000Z"
            "location": "jbjdbj"
            "meetingId": "4ufGx-0NL"
            "name": "vaibhav tak"
            "purpose": "Building Relationships"
            "remindMe": true
            "start": Fri Jan 18 2019 14:59:09 GMT+0530 (India Standard Time) {}
            "startDate": "2019-01-18T09:29:09.000Z"
            "title": "dkbd"
            "__v": 0
            "_id": "5c3ef97275130c1324b677c0"
        }
    ]
}
   */

  // param: meetingId
  app.post(`/deleteMeeting/:meetingId`, auth.isAuthorized, meetingController.deleteMeeting)
  /**
   * @apiGroup meeting
   * @apiVersion 1.0.0
   * @api {post} /api/v1/meeting/deleteMeeting/:meetingId api to delete meeting by admin
   * 
   * @apiParam {string} meetingId Meeting Id of the meeting which is to be deleted
   * @apiParam {string} authToken Authorization Token of the admin
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "meeting was successfully deleted",
    "status": 200,
    "data": {
        "createdBy": "vaibhav tak"
        "createdByEmail": "vaibhav.tak@xyz.com"
        "createdById": "-zGtGVXTk"
        "createdFor": "3zclPt-r7"
        "createdForEmail": "aman.garg@xyz.com"
        "createdOn": "2019-01-16T13:12:33.000Z"
        "endDate": "2019-01-17T16:12:21.000Z"
        "location": "room3"
        "meetingId": "eat7GOGxv"
        "purpose": "Defects Status"
        "startDate": "2019-01-17T15:12:21.000Z"
        "title": "Meeting1"
        "__v": 0
        "_id": "5c3f2dc175130c1324b677c4"
    }
}
   */

}

module.exports = {
  setRouter: setRouter
}