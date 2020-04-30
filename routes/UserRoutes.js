const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const appConfig = require('./../config/config')
const auth = require('../middleware/auth')

let setRouter = (app) => {


    // params: firstName, lastName, isAdmin, mobileNumber, email, password, userName, countryName
    app.post(`/signup`, userController.signUpFunction);
    /**
     * @apiGroup users
     * @apiVersion 1.0.0
     * @api {post} /signup api for new user signUp
     * 
     * @apiParam {string} firstName First Name of user. (body params)(required)
     * @apiParam {string} lastName Last Name of user. (body params)(required)
     * @apiParam {string} email Email of user. (body params)(required)
     * @apiParam {number} mobileNumber Mobile Number of user. (body params)(required)
     * @apiParam {string} countryName Country Name of user. (body params)(required)
     * @apiParam {boolean} isAdmin boolean value either true/false of user. (body params)(required)
     * @apiParam {string} password Password of user. (body params)(required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "User created",
      "status": 200,
      "data": {
          "countryCode": 91
          "countryName": "IN"
          "createdOn": "2020-04-22T20:55:36.000Z"
          "email": "chakladar.sandeep@gmail.com"
          "firstName": "Sandy"
          "isAdmin": false
          "lastName": "c"
          "mobileNumber": 9922559922    
          "userId": "Xk1Ll0"
          "__v": 0
          "_id": "5ea0af48a3754b0770171c78"
      }
  }
    */

    // params: email, password
    app.post(`/login`, userController.loginFunction);
    /**
     * @apiGroup users
     * @apiVersion 1.0.0
     * @api {post} /login api for user login.
     * 
     * @apiParam {string} email Email of the user. (body params)(required)
     * @apiParam {string} password Password of the user. (body params)(required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "Login Successful",
      "status": 200,
      "data": {
          "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IldmeXpkczRnIiwiaWF0IjoxNTg3NTg5MTY2NjcwLCJleHAiOjE1ODc2NzU1NjYsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6ImVkQ2hhdCIsImRhdGEiOnsiZmlyc3ROYW1lIjoic2FuZGVlcCIsImxhc3ROYW1lIjoiYyIsInVzZXJJZCI6IlhrMUxsMCIsIm1vYmlsZU51bWJlciI6OTE2NzE2MjAxOTAsImlzQWRtaW4iOmZhbHNlLCJlbWFpbCI6ImNoYWtsYWRhci5zYW5kZWVwNEBnbWFpbC5jb20iLCJjb3VudHJ5TmFtZSI6IncifX0.XngmCEJMtdqR-NQosXdQTeh4js4l5npQumS1n9hiOh8",
          "userDetails": {
              "countryCode": 91
              "countryName": "IN"
              "email": "chakladar.sandeep@gmail.com"
              "firstName": "Sandeep"
              "isAdmin": false
              "lastName": "c"
              "mobileNumber": 9922559922
              "userId": "Xk1Ll0"
          }
      }
  }
     */

    app.post(`/logout/:userId`, userController.logout);
    /**
     * @apiGroup users
     * @apiVersion 1.0.0
     * @api {post} /logout/:userId api to log out
     * 
     * @apiParam {string} userId User ID of the user (body params)(required)
     * @apiParam {string} authToken Authorization Token of user (body params)(required) 
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "Logged Out Successfully",
      "status": 200,
      "data": null
  }
     */

    // params: email
    app.post(`/forgotPassword`, userController.forgotPassword)
    /**
     * @apiGroup users
     * @apiVersion 1.0.0
     * @api {post} /forgotPassword api to send link for resetting the password
     * 
     * @apiParam {string} email Email of the user (body params)(required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "email send successfully for password reset",
      "status": 200,
      "data": {
          "error": false,
          "message": "Email sent to reset password",
          "status": 200,
          "data": "email sent"
      }
  }
     */

    // params: password
    // app.post(`/resetPassword`, userController.resetPassword)
    /**
     * @apiGroup users
     * @apiVersion 1.0.0
     * @api {post} /resetPassword api to reset the password 
     * 
     * @apiParam {string} password Password of the user (body params)(required)
     * @apiParam {userId} userId User Id of the user (body params)(required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * { 
      "error": false,
      "message": "email successfully reset",
      "status": 200,
      "data": { 
          "error": false,
          "message": "password changed successfully",
          "status": 200,
          "data": "password changed successfully" 
      } 
  }
     */

    app.get(`/view/all`, userController.getAllUsers)
    /**
     * @apiGroup users
     * @apiVersion 1.0.0
     * @api {get} /view/all api to get all users
     * 
     * @apiParam {string} authToken authToken of the user. (query params/body params/header)(required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "All User Details Found",
      "status": 200,
      "data": [
          {
	        "_id" : ObjectId("5ea1b652cde4724ac0e46700"),
	       "firstName" : "Sandeep",
	       "lastName" : "chakladar",
	       "userId" : "kj4UEw",
	       "mobileNumber" : 9167162014,
	       "password" : "$2b$10$fvFzdvq99oCdFNpuaoQ0COUI9QpvuJp5OGRp8W0XKP3dDxPcPKqJu",
	       "isAdmin" : true,
	       "createdOn" : ISODate("2020-04-23T21:07:54.000+05:30"),
	       "email" : "chakladar.sandeep3@gmail.com",
	       "userName" : "exam-admin",
	       "countryName" : "IN",
	       "countryCode" : "91",
	       "__v" : 0
         },
          {
	       "_id" : ObjectId("5ea0af48a3754b0770171c78"),
	       "firstName" : "sandeep",
	       "lastName" : "c",
	       "userId" : "Xk1Ll0",
	       "mobileNumber" : 91671620190,
	       "password" : "$2b$10$QXEh.M.qsaQnpwm1MbBryunNqRzQ2wiZoBZ0hn3seE6U8ZM2JeBr2",
	       "isAdmin" : false,
	       "createdOn" : ISODate("2020-04-23T02:25:36.000+05:30"),
	       "email" : "chakladar.sandeep4@gmail.com",
	       "countryName" : "w",
	       "__v" : 0
           }
      ]
  }
     */

    app.post(`/:userId/delete`, auth.isAuthorized, userController.deleteUser);
    /**
     * @apiGroup users
     * @apiVersion 1.0.0
     * @api {get} view/all api to delete a user
     * 
     * @apiParam {string} authToken authToken of the user. (query params/body params/header)(required)
     * @apiParam {string} userId User Id of the user (body params)(required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "Deleted the user successfully",
      "status": 200,
      "data": [
           {
	       "_id" : ObjectId("5ea0af48a3754b0770171c78"),
	       "firstName" : "sandeep",
	       "lastName" : "c",
	       "userId" : "Xk1Ll0",
	       "mobileNumber" : 91671620190,
	       "password" : "$2b$10$QXEh.M.qsaQnpwm1MbBryunNqRzQ2wiZoBZ0hn3seE6U8ZM2JeBr2",
	       "isAdmin" : false,
	       "createdOn" : ISODate("2020-04-23T02:25:36.000+05:30"),
	       "email" : "chakladar.sandeep4@gmail.com",
	       "countryName" : "w",
	       "__v" : 0
           }
      ]
  }
     */
    app.get('/view/:userId', auth.isAuthorized, userController.getSingleUser);

    /**
	 * @api {get} /view/:userId Get a single user
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId The userId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User Details Found",
	    "status": 200,
	    "data":  {
	        "_id" : ObjectId("5ea1b652cde4724ac0e46700"),
	       "firstName" : "Sandeep",
	       "lastName" : "chakladar",
	       "userId" : "kj4UEw",
	       "mobileNumber" : 9167162014,
	       "password" : "$2b$10$fvFzdvq99oCdFNpuaoQ0COUI9QpvuJp5OGRp8W0XKP3dDxPcPKqJu",
	       "isAdmin" : true,
	       "createdOn" : ISODate("2020-04-23T21:07:54.000+05:30"),
	       "email" : "chakladar.sandeep3@gmail.com",
	       "userName" : "exam-admin",
	       "countryName" : "IN",
	       "countryCode" : "91",
	       "__v" : 0
         }
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "No User Found",
	    "status": 404,
	    "data": null
	   }
	 */

    app.put('/:userId/edit', userController.editUser);

    /**
	 * @api {put} /:userId/edit Edit user by userId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId userId of the user passed as the URL parameter
     * @apiParam {Object} options parameters passed for editing
     *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
        "message": "User details edited",
        "status": 200,
        "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1 
                }
	    }
	  
	 */






}

module.exports = {
    setRouter: setRouter
}