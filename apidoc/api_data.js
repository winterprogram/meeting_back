define({ "api": [
  {
    "group": "edit",
    "type": "put",
    "url": "/:userId/edit",
    "title": "Edit user by userId",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user passed as the URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>parameters passed for editing</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n        \"message\": \"user data edited successfully\",\n        \"status\": 200,\n        \"data\": {\n                    \"n\": 1,\n                    \"nModified\": 1,\n                    \"ok\": 1 \n                }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"'error user not found\",\n\t    \"status\": 404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "edit",
    "name": "PutUseridEdit"
  },
  {
    "group": "meeting",
    "version": "0.0.1",
    "type": "get",
    "url": "/allMeetings/:userId",
    "title": "api to fetch all meetings by admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the admin (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User id of admin (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"meetingn found - final\",\n      \"status\": 200,\n      \"data\": [\n             {\n                   \"_id\" : \"5eab3390aef6654144cbe68f\",\n                    \"meetingId\" : \"9OtjLABCo\",\n                    \"title\" : \"test\",\n                    \"startDate\" : \"2020-05-02T01:53:25.000+05:30\",\n                    \"endDate\" : \"2020-05-02T01:54:31.000+05:30\",\n                    \"createdBy\" : \"chakladar.sandeep3 exam-admin\",\n                    \"createdByEmail\" : \"chakladar.sandeep3@gmail.com\",\n                    \"createdById\" : \"Vc5ddyVuZ\",\n                    \"location\" : \"test\",\n                    \"purpose\" : \"Others\",\n                    \"createdFor\" : \"PZ6a1D\",\n                    \"createdForEmail\" : \"chakladar.sandeep4@gmail.com\",\n                    \"createdOn\" : \"2020-05-01T01:52:40.000+05:30\",\n                    \"__v\" : 0\n                }  \n      ]\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"error meeting not found - final\",\n \"status\": 500,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/MeetingRoutes.js",
    "groupTitle": "meeting",
    "name": "GetAllmeetingsUserid"
  },
  {
    "group": "meeting",
    "version": "0.0.1",
    "type": "get",
    "url": "/fetchmeetingbyuser",
    "title": "api to get all meetings of a particular user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the admin (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdById",
            "description": "<p>User ID of admin (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdForId",
            "description": "<p>User ID of normal user (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"meeting found while finding meeting by user - final\",\n      \"status\": 200,\n      \"data\": [\n           {\n                   \"_id\" : \"5eab3390aef6654144cbe68f\",\n                    \"meetingId\" : \"9OtjLABCo\",\n                    \"title\" : \"test\",\n                    \"startDate\" : \"2020-05-02T01:53:25.000+05:30\",\n                    \"endDate\" : \"2020-05-02T01:54:31.000+05:30\",\n                    \"createdBy\" : \"chakladar.sandeep3 exam-admin\",\n                    \"createdByEmail\" : \"chakladar.sandeep3@gmail.com\",\n                    \"createdById\" : \"Vc5ddyVuZ\",\n                    \"location\" : \"test\",\n                    \"purpose\" : \"Others\",\n                    \"createdFor\" : \"PZ6a1D\",\n                    \"createdForEmail\" : \"chakladar.sandeep4@gmail.com\",\n                    \"createdOn\" : \"2020-05-01T01:52:40.000+05:30\",\n                    \"__v\" : 0\n        },\n        {\n                   \"_id\" : \"5eab336eaef6654144cbe68e\",\n                    \"meetingId\" : \"4L6cumOWv\",\n                    \"title\" : \"test\",\n                    \"startDate\" : \"2020-05-01T01:52:49.000+05:30\",\n                    \"endDate\" : \"2020-05-01T01:53:59.000+05:30\",\n                    \"createdBy\" : \"chakladar.sandeep3 exam-admin\",\n                    \"createdByEmail\" : \"chakladar.sandeep3@gmail.com\",\n                    \"createdById\" : \"Vc5ddyVuZ\",\n                    \"location\" : \"test\",\n                    \"purpose\" : \"Others\",\n                    \"createdFor\" : \"PZ6a1D\",\n                    \"createdForEmail\" : \"chakladar.sandeep4@gmail.com\",\n                    \"createdOn\" : \"2020-05-01T01:52:06.000+05:30\",\n                    \"__v\" : 0\n        }\n      ]\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"error - meeting found while finding meeting by user - final\",\n \"status\": 404,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/MeetingRoutes.js",
    "groupTitle": "meeting",
    "name": "GetFetchmeetingbyuser"
  },
  {
    "group": "meeting",
    "version": "0.0.1",
    "type": "get",
    "url": "/getmeetingbyuser/:userId",
    "title": "api to fetch all meetings of normal user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the normal user (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id of normal user (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"meeting fetched for user - final\",\n      \"status\": 200,\n      \"data\": [\n           {\n                   \"_id\" : \"5eab3390aef6654144cbe68f\",\n                    \"meetingId\" : \"9OtjLABCo\",\n                    \"title\" : \"test\",\n                    \"startDate\" : \"2020-05-02T01:53:25.000+05:30\",\n                    \"endDate\" : \"2020-05-02T01:54:31.000+05:30\",\n                    \"createdBy\" : \"chakladar.sandeep3 exam-admin\",\n                    \"createdByEmail\" : \"chakladar.sandeep3@gmail.com\",\n                    \"createdById\" : \"Vc5ddyVuZ\",\n                    \"location\" : \"test\",\n                    \"purpose\" : \"Others\",\n                    \"createdFor\" : \"PZ6a1D\",\n                    \"createdForEmail\" : \"chakladar.sandeep4@gmail.com\",\n                    \"createdOn\" : \"2020-05-01T01:52:40.000+05:30\",\n                    \"__v\" : 0\n        },\n        {\n                   \"_id\" : \"5eab336eaef6654144cbe68e\",\n                    \"meetingId\" : \"4L6cumOWv\",\n                    \"title\" : \"test\",\n                    \"startDate\" : \"2020-05-01T01:52:49.000+05:30\",\n                    \"endDate\" : \"2020-05-01T01:53:59.000+05:30\",\n                    \"createdBy\" : \"chakladar.sandeep3 exam-admin\",\n                    \"createdByEmail\" : \"chakladar.sandeep3@gmail.com\",\n                    \"createdById\" : \"Vc5ddyVuZ\",\n                    \"location\" : \"test\",\n                    \"purpose\" : \"Others\",\n                    \"createdFor\" : \"PZ6a1D\",\n                    \"createdForEmail\" : \"chakladar.sandeep4@gmail.com\",\n                    \"createdOn\" : \"2020-05-01T01:52:06.000+05:30\",\n                    \"__v\" : 0\n        }\n      ]\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"error while finding meetings by user - final\",\n \"status\": 404,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/MeetingRoutes.js",
    "groupTitle": "meeting",
    "name": "GetGetmeetingbyuserUserid"
  },
  {
    "group": "meeting",
    "version": "0.0.1",
    "type": "get",
    "url": "/selectmeeting/:meetingId",
    "title": "api to get selected meeting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the admin (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>Meeting ID of the meeting (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"meeting fetched for user\",\n      \"status\": 200,\n      \"data\": {\n                   \"_id\" : \"5eab336eaef6654144cbe68e\",\n                    \"meetingId\" : \"4L6cumOWv\",\n                    \"title\" : \"test\",\n                    \"startDate\" : \"2020-05-01T01:52:49.000+05:30\",\n                    \"endDate\" : \"2020-05-01T01:53:59.000+05:30\",\n                    \"createdBy\" : \"chakladar.sandeep3 exam-admin\",\n                    \"createdByEmail\" : \"chakladar.sandeep3@gmail.com\",\n                    \"createdById\" : \"Vc5ddyVuZ\",\n                    \"location\" : \"test\",\n                    \"purpose\" : \"Others\",\n                    \"createdFor\" : \"PZ6a1D\",\n                    \"createdForEmail\" : \"chakladar.sandeep4@gmail.com\",\n                    \"createdOn\" : \"2020-05-01T01:52:06.000+05:30\",\n                    \"__v\" : 0\n        }\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"no meeting found for user\",\n \"status\": 404,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/MeetingRoutes.js",
    "groupTitle": "meeting",
    "name": "GetSelectmeetingMeetingid"
  },
  {
    "group": "meeting",
    "version": "0.0.1",
    "type": "post",
    "url": "/createMeeting",
    "title": "api to create new meeting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start Date of meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "endDate",
            "description": "<p>End of meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Name of the Admin, by whom meeting was created for a user (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdByEmail",
            "description": "<p>Email of the Admin, by whom meeting was created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdById",
            "description": "<p>adminId of the Admin, by whom meeting was created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdFor",
            "description": "<p>ID of the Normal User for whom the meeting was created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdForEmail",
            "description": "<p>Email of the Normal user for whom the meeting was created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>Purpose of the meeting, selected by admin (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token(body param/header/query param) of the admin who created meeting (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http status code and result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n       \"error\": false,\n       \"message\": \"success meeting created\",\n       \"status\": 200,\n       \"data\": {\n                   \"_id\" : \"5eab3390aef6654144cbe68f\",\n                    \"meetingId\" : \"9OtjLABCo\",\n                    \"title\" : \"test\",\n                    \"startDate\" : \"2020-05-02T01:53:25.000+05:30\",\n                    \"endDate\" : \"2020-05-02T01:54:31.000+05:30\",\n                    \"createdBy\" : \"chakladar.sandeep3 exam-admin\",\n                    \"createdByEmail\" : \"chakladar.sandeep3@gmail.com\",\n                    \"createdById\" : \"Vc5ddyVuZ\",\n                    \"location\" : \"test\",\n                    \"purpose\" : \"Others\",\n                    \"createdFor\" : \"PZ6a1D\",\n                    \"createdForEmail\" : \"chakladar.sandeep4@gmail.com\",\n                    \"createdOn\" : \"2020-05-01T01:52:40.000+05:30\",\n                    \"__v\" : 0\n                }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"error while saving meeting data\",\n \"status\": 500,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/MeetingRoutes.js",
    "groupTitle": "meeting",
    "name": "PostCreatemeeting"
  },
  {
    "group": "meeting",
    "version": "0.0.1",
    "type": "post",
    "url": "/deleteMeeting/:meetingId",
    "title": "api to delete meeting by admin user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>Meeting Id of the meeting which is to be deleted</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of the admin</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"meeting was successfully deleted\",\n      \"status\": 200,\n      \"data\": {\n                   \"_id\" : \"5eab336eaef6654144cbe68e\",\n                    \"meetingId\" : \"4L6cumOWv\",\n                    \"title\" : \"test\",\n                    \"startDate\" : \"2020-05-01T01:52:49.000+05:30\",\n                    \"endDate\" : \"2020-05-01T01:53:59.000+05:30\",\n                    \"createdBy\" : \"chakladar.sandeep3 exam-admin\",\n                    \"createdByEmail\" : \"chakladar.sandeep3@gmail.com\",\n                    \"createdById\" : \"Vc5ddyVuZ\",\n                    \"location\" : \"test\",\n                    \"purpose\" : \"Others\",\n                    \"createdFor\" : \"PZ6a1D\",\n                    \"createdForEmail\" : \"chakladar.sandeep4@gmail.com\",\n                    \"createdOn\" : \"2020-05-01T01:52:06.000+05:30\",\n                    \"__v\" : 0\n               }\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"error while deleting selected meeting data\",\n \"status\": 500,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/MeetingRoutes.js",
    "groupTitle": "meeting",
    "name": "PostDeletemeetingMeetingid"
  },
  {
    "group": "meeting",
    "version": "0.0.1",
    "type": "put",
    "url": "/updateusermeeting/:meetingId",
    "title": "api to update a particular user meeting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>meeting id of the meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token(header/body param/query param) of the creator of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start Date of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "datw",
            "optional": false,
            "field": "endDate",
            "description": "<p>End Date of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>Purpose of the meeting (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http status code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"updated successfully\",\n      \"status\": 200,\n      \"data\": {\n          \"data\": {n: 1, nModified: 1, ok: 1}\n          \"error\": false\n          \"message\": \"updated successfully\"\n          \"status\": 200\n              }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"error meeting data not updated\",\n \"status\": 500,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/MeetingRoutes.js",
    "groupTitle": "meeting",
    "name": "PutUpdateusermeetingMeetingid"
  },
  {
    "group": "read",
    "type": "get",
    "url": "/view/:userId",
    "title": "Get a single user",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The userId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"user found\",\n\t    \"status\": 200,\n\t    \"data\":  {\n\t        \"_id\" : \"5ea1b652cde4724ac0e46700\",\n\t       \"firstName\" : \"Sandeep\",\n\t       \"lastName\" : \"chakladar\",\n\t       \"userId\" : \"kj4UEw\",\n\t       \"mobileNumber\" : 9167162014,\n\t       \"password\" : \"$2b$10$fvFzdvq99oCdFNpuaoQ0COUI9QpvuJp5OGRp8W0XKP3dDxPcPKqJu\",\n\t       \"isAdmin\" : true,\n\t       \"createdOn\" : ISODate(\"2020-04-23T21:07:54.000+05:30\"),\n\t       \"email\" : \"chakladar.sandeep3@gmail.com\",\n\t       \"userName\" : \"exam-admin\",\n\t       \"countryName\" : \"IN\",\n\t       \"countryCode\" : \"91\",\n\t       \"__v\" : 0\n         }\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"error no user found\",\n\t    \"status\": 404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "read",
    "name": "GetViewUserid"
  },
  {
    "group": "users",
    "version": "0.0.1",
    "type": "get",
    "url": "/:userId/delete",
    "title": "api to delete a user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params/body params/header)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id of the user (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"user deleted successfully\",\n      \"status\": 200,\n      \"data\": [\n           {\n\t       \"_id\" : \"5ea0af48a3754b0770171c78\",\n\t       \"firstName\" : \"sandeep\",\n\t       \"lastName\" : \"c\",\n\t       \"userId\" : \"Xk1Ll0\",\n\t       \"mobileNumber\" : 91671620190,\n\t       \"password\" : \"$2b$10$QXEh.M.qsaQnpwm1MbBryunNqRzQ2wiZoBZ0hn3seE6U8ZM2JeBr2\",\n\t       \"isAdmin\" : false,\n\t       \"createdOn\" : ISODate(\"2020-04-23T02:25:36.000+05:30\"),\n\t       \"email\" : \"chakladar.sandeep4@gmail.com\",\n\t       \"countryName\" : \"w\",\n\t       \"__v\" : 0\n           }\n      ]\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"user not found\",\n \"status\": 500,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "GetUseridDelete"
  },
  {
    "group": "users",
    "version": "0.0.1",
    "type": "get",
    "url": "/view/all",
    "title": "api to get all users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params/body params/header)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"details fetched for all user\",\n      \"status\": 200,\n      \"data\": [\n          {\n\t        \"_id\" :\"5ea1b652cde4724ac0e46700\",\n\t       \"firstName\" : \"Sandeep\",\n\t       \"lastName\" : \"chakladar\",\n\t       \"userId\" : \"kj4UEw\",\n\t       \"mobileNumber\" : 9167162014,\n\t       \"password\" : \"$2b$10$fvFzdvq99oCdFNpuaoQ0COUI9QpvuJp5OGRp8W0XKP3dDxPcPKqJu\",\n\t       \"isAdmin\" : true,\n\t       \"createdOn\" : ISODate(\"2020-04-23T21:07:54.000+05:30\"),\n\t       \"email\" : \"chakladar.sandeep3@gmail.com\",\n\t       \"userName\" : \"exam-admin\",\n\t       \"countryName\" : \"IN\",\n\t       \"countryCode\" : \"91\",\n\t       \"__v\" : 0\n         },\n          {\n\t       \"_id\" : \"5ea0af48a3754b0770171c78\",\n\t       \"firstName\" : \"sandeep\",\n\t       \"lastName\" : \"c\",\n\t       \"userId\" : \"Xk1Ll0\",\n\t       \"mobileNumber\" : 91671620190,\n\t       \"password\" : \"$2b$10$QXEh.M.qsaQnpwm1MbBryunNqRzQ2wiZoBZ0hn3seE6U8ZM2JeBr2\",\n\t       \"isAdmin\" : false,\n\t       \"createdOn\" : ISODate(\"2020-04-23T02:25:36.000+05:30\"),\n\t       \"email\" : \"chakladar.sandeep4@gmail.com\",\n\t       \"countryName\" : \"w\",\n\t       \"__v\" : 0\n           }\n      ]\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"No Users Found\",\n \"status\": 500,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "GetViewAll"
  },
  {
    "group": "users",
    "version": "0.0.1",
    "type": "post",
    "url": "/forgotPassword",
    "title": "api to send link for resetting the password",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"email send successfully for password reset\",\n      \"status\": 200,\n      \"data\": {\n          \"error\": false,\n          \"message\": \"Email sent to reset password\",\n          \"status\": 200,\n          \"data\": \"email sent\"\n      }\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"error mail didn't share\",\n \"status\": 500,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostForgotpassword"
  },
  {
    "group": "users",
    "version": "0.0.1",
    "type": "post",
    "url": "/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"Login Successful\",\n      \"status\": 200,\n      \"data\": {\n          \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IldmeXpkczRnIiwiaWF0IjoxNTg3NTg5MTY2NjcwLCJleHAiOjE1ODc2NzU1NjYsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6ImVkQ2hhdCIsImRhdGEiOnsiZmlyc3ROYW1lIjoic2FuZGVlcCIsImxhc3ROYW1lIjoiYyIsInVzZXJJZCI6IlhrMUxsMCIsIm1vYmlsZU51bWJlciI6OTE2NzE2MjAxOTAsImlzQWRtaW4iOmZhbHNlLCJlbWFpbCI6ImNoYWtsYWRhci5zYW5kZWVwNEBnbWFpbC5jb20iLCJjb3VudHJ5TmFtZSI6IncifX0.XngmCEJMtdqR-NQosXdQTeh4js4l5npQumS1n9hiOh8\",\n          \"userDetails\": {\n              \"countryCode\": 91\n              \"countryName\": \"IN\"\n              \"email\": \"chakladar.sandeep@gmail.com\"\n              \"firstName\": \"Sandeep\"\n              \"isAdmin\": false\n              \"lastName\": \"c\"\n              \"mobileNumber\": 9922559922\n              \"userId\": \"Xk1Ll0\"\n          }\n      }\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"error login\",\n \"status\": 500,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostLogin"
  },
  {
    "group": "users",
    "version": "0.0.1",
    "type": "post",
    "url": "/logout/:userId",
    "title": "api to log out",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User ID of the user (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"Logged Out Successfully\",\n      \"status\": 200,\n      \"data\": null\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"error received blank data\",\n \"status\": 500,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostLogoutUserid"
  },
  {
    "group": "users",
    "version": "0.0.1",
    "type": "post",
    "url": "/signup",
    "title": "api for new user signUp",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryName",
            "description": "<p>Country Name of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>boolean value either true/false. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user. (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "API",
            "description": "<p>Response shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"User created\",\n      \"status\": 200,\n      \"data\": {\n          \"countryCode\": 91\n          \"countryName\": \"IN\"\n          \"createdOn\": \"2020-04-22T20:55:36.000Z\"\n          \"email\": \"chakladar.sandeep@gmail.com\"\n          \"firstName\": \"Sandy\"\n          \"isAdmin\": false\n          \"lastName\": \"c\"\n          \"mobileNumber\": 9922559922    \n          \"userId\": \"Xk1Ll0\"\n          \"__v\": 0\n          \"_id\": \"5ea0af48a3754b0770171c78\"\n      }\n  }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n \"error\": true,\n \"message\": \"error while saving data\",\n \"status\": 500,\n \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostSignup"
  }
] });
