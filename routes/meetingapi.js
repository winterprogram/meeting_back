const express = require('express');
const meetingapi = require("../controller/meetingapi");
const appConfig = require("./../config/config")
const auth = require('../middleware/auth')

let setRouter = (app) => {


    // params: startDate, endDate, title, createdByEmail, createdBy, createdById, createdForEmail, createdFor, meetingId,location,purpose
    app.post(`/createMeeting`, auth.isAuthorized, meetingapi.meetingcreate);

    /**
     * @apiGroup meeting
     * @apiVersion 0.0.1
     * @api {post} /createMeeting api to create new meeting
     * 
     * @apiParam {string} title Title of the meeting (body param) (required)
     * @apiParam {date} startDate Start Date of meeting (body param) (required)
     * @apiParam {date} endDate End of meeting (body param) (required)
     * @apiParam {string} createdBy Name of the Admin, by whom meeting was created for a user (body param) (required)
     * @apiParam {string} createdByEmail Email of the Admin, by whom meeting was created (body param) (required)
     * @apiParam {string} createdById adminId of the Admin, by whom meeting was created (body param) (required)
     * @apiParam {string} createdFor ID of the Normal User for whom the meeting was created (body param) (required)
     * @apiParam {string} createdForEmail Email of the Normal user for whom the meeting was created (body param) (required)
     * @apiParam {string} location Location of the meeting (body param) (required)
     * @apiParam {string} purpose Purpose of the meeting, selected by admin (body param) (required)
     * @apiParam {string} authToken Authorization Token(body param/header/query param) of the admin who created meeting (body param) (required)
     * 
     * @apiSuccess {object} API Response shows error status, message, http status code and result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * { 
       "error": false,
       "message": "success meeting created",
       "status": 200,
       "data": {
                   "_id" : "5eab3390aef6654144cbe68f",
                    "meetingId" : "9OtjLABCo",
                    "title" : "test",
                    "startDate" : "2020-05-02T01:53:25.000+05:30",
                    "endDate" : "2020-05-02T01:54:31.000+05:30",
                    "createdBy" : "chakladar.sandeep3 exam-admin",
                    "createdByEmail" : "chakladar.sandeep3@gmail.com",
                    "createdById" : "Vc5ddyVuZ",
                    "location" : "test",
                    "purpose" : "Others",
                    "createdFor" : "PZ6a1D",
                    "createdForEmail" : "chakladar.sandeep4@gmail.com",
                    "createdOn" : "2020-05-01T01:52:40.000+05:30",
                    "__v" : 0
                }
        }

    * @apiErrorExample Error-Response:
      { 
       "error": true,
       "message": "error while saving meeting data",
       "status": 500,
       "data": null
        }
     */

    // params: title, startDate, endDate,location,purpose
    app.put(`/updateusermeeting/:meetingId`, auth.isAuthorized, meetingapi.updateusermeeting)
    /**
     * @apiGroup meeting
     * @apiVersion 0.0.1
     * @api {put} /updateusermeeting/:meetingId api to update a particular user meeting
     * 
     * @apiParam {string} title Title of the meeting (body param) (required)
     * @apiParam {string} meetingId meeting id of the meeting
     * @apiParam {string} authToken Authorization Token(header/body param/query param) of the creator of the meeting (body param) (required)
     * @apiParam {date} startDate Start Date of the meeting (body param) (required)
     * @apiParam {datw} endDate End Date of the meeting (body param) (required)
     * @apiParam {string} location Location of the meeting (body param) (required)
     * @apiParam {string} purpose Purpose of the meeting (body param) (required)
     * 
     * 
     * @apiSuccess {object} API Response shows error status, message, http status code, result
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

        * @apiErrorExample Error-Response:
      { 
       "error": true,
       "message": "error meeting data not updated",
       "status": 500,
       "data": null
        }
     */

    // params: userId
    app.get(`/fetchallmeetings/:userId`, auth.isAuthorized, meetingapi.fetchallmeetings)
    /**
     * @apiGroup meeting
     * @apiVersion 0.0.1
     * @api {get} /allMeetings/:userId api to fetch all meetings by admin
     * 
     * @apiParam {string} authToken Authorization(body param/header/query param) Token of the admin (body param) (required)
     * @apiParam {string} userId User id of admin (body param) (required)
     * 
     * @apiSuccess {object} API Response shows error status, message, http stataus code, result
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "meetingn found - final",
      "status": 200,
      "data": [
             {
                   "_id" : "5eab3390aef6654144cbe68f",
                    "meetingId" : "9OtjLABCo",
                    "title" : "test",
                    "startDate" : "2020-05-02T01:53:25.000+05:30",
                    "endDate" : "2020-05-02T01:54:31.000+05:30",
                    "createdBy" : "chakladar.sandeep3 exam-admin",
                    "createdByEmail" : "chakladar.sandeep3@gmail.com",
                    "createdById" : "Vc5ddyVuZ",
                    "location" : "test",
                    "purpose" : "Others",
                    "createdFor" : "PZ6a1D",
                    "createdForEmail" : "chakladar.sandeep4@gmail.com",
                    "createdOn" : "2020-05-01T01:52:40.000+05:30",
                    "__v" : 0
                }  
      ]
  }
         * @apiErrorExample Error-Response:
      { 
       "error": true,
       "message": "error meeting not found - final",
       "status": 500,
       "data": null
        }
     */

    // query params: createdById, createdForId
    app.get(`/fetchmeetingbyuser`, auth.isAuthorized, meetingapi.fetchmeetingbyuser)
    /**
     * @apiGroup meeting
     * @apiVersion 0.0.1
     * @api {get} /fetchmeetingbyuser api to get all meetings of a particular user
     * 
     * @apiParam {string} authToken Authorization(body param/header/query param) Token of the admin (body param) (required)
     * @apiParam {string} createdById User ID of admin (body param) (required)
     * @apiParam {string} createdForId User ID of normal user (body param) (required)
     * 
     * @apiSuccess {object} API Response shows error status, message, http stataus code, result
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "meeting found while finding meeting by user - final",
      "status": 200,
      "data": [
           {
                   "_id" : "5eab3390aef6654144cbe68f",
                    "meetingId" : "9OtjLABCo",
                    "title" : "test",
                    "startDate" : "2020-05-02T01:53:25.000+05:30",
                    "endDate" : "2020-05-02T01:54:31.000+05:30",
                    "createdBy" : "chakladar.sandeep3 exam-admin",
                    "createdByEmail" : "chakladar.sandeep3@gmail.com",
                    "createdById" : "Vc5ddyVuZ",
                    "location" : "test",
                    "purpose" : "Others",
                    "createdFor" : "PZ6a1D",
                    "createdForEmail" : "chakladar.sandeep4@gmail.com",
                    "createdOn" : "2020-05-01T01:52:40.000+05:30",
                    "__v" : 0
        },
        {
                   "_id" : "5eab336eaef6654144cbe68e",
                    "meetingId" : "4L6cumOWv",
                    "title" : "test",
                    "startDate" : "2020-05-01T01:52:49.000+05:30",
                    "endDate" : "2020-05-01T01:53:59.000+05:30",
                    "createdBy" : "chakladar.sandeep3 exam-admin",
                    "createdByEmail" : "chakladar.sandeep3@gmail.com",
                    "createdById" : "Vc5ddyVuZ",
                    "location" : "test",
                    "purpose" : "Others",
                    "createdFor" : "PZ6a1D",
                    "createdForEmail" : "chakladar.sandeep4@gmail.com",
                    "createdOn" : "2020-05-01T01:52:06.000+05:30",
                    "__v" : 0
        }
      ]
  }

     * @apiErrorExample Error-Response:
      { 
       "error": true,
       "message": "error - meeting found while finding meeting by user - final",
       "status": 404,
       "data": null
        }
     */

    // param: meetingId
    app.get(`/selectmeeting/:meetingId`, auth.isAuthorized, meetingapi.selectmeeting)
    /**
     * @apiGroup meeting
     * @apiVersion 0.0.1
     * @api {get} /selectmeeting/:meetingId api to get selected meeting
     * 
     * @apiParam {string} authToken Authorization(body param/header/query param) Token of the admin (body param) (required)
     * @apiParam {string} meetingId Meeting ID of the meeting (body param) (required)
     * 
     * @apiSuccess {object} API Response shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "meeting fetched for user",
      "status": 200,
      "data": {
                   "_id" : "5eab336eaef6654144cbe68e",
                    "meetingId" : "4L6cumOWv",
                    "title" : "test",
                    "startDate" : "2020-05-01T01:52:49.000+05:30",
                    "endDate" : "2020-05-01T01:53:59.000+05:30",
                    "createdBy" : "chakladar.sandeep3 exam-admin",
                    "createdByEmail" : "chakladar.sandeep3@gmail.com",
                    "createdById" : "Vc5ddyVuZ",
                    "location" : "test",
                    "purpose" : "Others",
                    "createdFor" : "PZ6a1D",
                    "createdForEmail" : "chakladar.sandeep4@gmail.com",
                    "createdOn" : "2020-05-01T01:52:06.000+05:30",
                    "__v" : 0
        }
  }
         * @apiErrorExample Error-Response:
      { 
       "error": true,
       "message": "no meeting found for user",
       "status": 404,
       "data": null
        }
     */

    // param: userId
    app.get(`/getmeetingbyuser/:userId`, auth.isAuthorized, meetingapi.getmeetingbyuser)
    /**
     * @apiGroup meeting
     * @apiVersion 0.0.1
     * @api {get} /getmeetingbyuser/:userId api to fetch all meetings of normal user
     * 
     * @apiParam {string} authToken Authorization(body param/header/query param) Token of the normal user (body param) (required)
     * @apiParam {string} userId User Id of normal user (body param) (required)
     * 
     * @apiSuccess {object} API Response shows error status, message, http stataus code, result
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "meeting fetched for user - final",
      "status": 200,
      "data": [
           {
                   "_id" : "5eab3390aef6654144cbe68f",
                    "meetingId" : "9OtjLABCo",
                    "title" : "test",
                    "startDate" : "2020-05-02T01:53:25.000+05:30",
                    "endDate" : "2020-05-02T01:54:31.000+05:30",
                    "createdBy" : "chakladar.sandeep3 exam-admin",
                    "createdByEmail" : "chakladar.sandeep3@gmail.com",
                    "createdById" : "Vc5ddyVuZ",
                    "location" : "test",
                    "purpose" : "Others",
                    "createdFor" : "PZ6a1D",
                    "createdForEmail" : "chakladar.sandeep4@gmail.com",
                    "createdOn" : "2020-05-01T01:52:40.000+05:30",
                    "__v" : 0
        },
        {
                   "_id" : "5eab336eaef6654144cbe68e",
                    "meetingId" : "4L6cumOWv",
                    "title" : "test",
                    "startDate" : "2020-05-01T01:52:49.000+05:30",
                    "endDate" : "2020-05-01T01:53:59.000+05:30",
                    "createdBy" : "chakladar.sandeep3 exam-admin",
                    "createdByEmail" : "chakladar.sandeep3@gmail.com",
                    "createdById" : "Vc5ddyVuZ",
                    "location" : "test",
                    "purpose" : "Others",
                    "createdFor" : "PZ6a1D",
                    "createdForEmail" : "chakladar.sandeep4@gmail.com",
                    "createdOn" : "2020-05-01T01:52:06.000+05:30",
                    "__v" : 0
        }
      ]
  }
     * @apiErrorExample Error-Response:
      { 
       "error": true,
       "message": "error while finding meetings by user - final",
       "status": 404,
       "data": null
        }
     */

    // param: meetingId, authToken
    app.post(`/deletemeetingforuser/:meetingId`, auth.isAuthorized, meetingapi.deletemeetingforuser)
    /**
     * @apiGroup meeting
     * @apiVersion 0.0.1
     * @api {post} /deleteMeeting/:meetingId api to delete meeting by admin user
     * 
     * @apiParam {string} meetingId Meeting Id of the meeting which is to be deleted
     * @apiParam {string} authToken Authorization Token of the admin
     * 
     * @apiSuccess {object} API Response shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "meeting was successfully deleted",
      "status": 200,
      "data": {
                   "_id" : "5eab336eaef6654144cbe68e",
                    "meetingId" : "4L6cumOWv",
                    "title" : "test",
                    "startDate" : "2020-05-01T01:52:49.000+05:30",
                    "endDate" : "2020-05-01T01:53:59.000+05:30",
                    "createdBy" : "chakladar.sandeep3 exam-admin",
                    "createdByEmail" : "chakladar.sandeep3@gmail.com",
                    "createdById" : "Vc5ddyVuZ",
                    "location" : "test",
                    "purpose" : "Others",
                    "createdFor" : "PZ6a1D",
                    "createdForEmail" : "chakladar.sandeep4@gmail.com",
                    "createdOn" : "2020-05-01T01:52:06.000+05:30",
                    "__v" : 0
               }
  }
    * @apiErrorExample Error-Response:
      { 
       "error": true,
       "message": "error while deleting selected meeting data",
       "status": 500,
       "data": null
        }
     */

}

module.exports = {
    setRouter: setRouter
}