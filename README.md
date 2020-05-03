# Meeting App (Meeting Planner) 

This application is built to schedule meetings. Typically this web is much more usefull in mid-scale to large-scale companies where there is an interaction involved with 3rd person like receptionist to book conference rooms for meetings. 

Project urls:-

1) Angular :- http://13.233.86.6

   Github Link :- https://github.com/winterprogram/meeting_front

2) Node App :- http://15.206.28.103

    Github Link :- https://github.com/winterprogram/meeting_back

Note :- Node url is protected by Cros, please use localhost:3000 to test Rest apis.

## Installing

### Step - 1

Note : You can skip this steps if you have Node ,npm and angularCLI installed on your system.
 
1) To start with this, install node and npm

* [NodeJs](https://nodejs.org/en/) -  to install node (node version >12.0.0)

2) Install git 


* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) -  install Git

### Step - 2

Note : If you are on linux based OS then perform below commands:-

```
sudo npm install --unsafe-perm
```
1) For windows to install all package dependencies :- 

```
npm install 
```
1) For linus/macOs to install all package dependencies :- 

```
sudo npm install 
```
### Step - 3

To run node server locally

 #### 3.1 Mongodb server
 
 Run mongod on your local machine by running below command:-
 ```
 mongod
 ```
 Note :- If mongodb is not installed please install it using [Mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/). Then set environment variable as "mongod".

#### 3.2 NoSql booster (optional)

[NoSQLBooster](https://nosqlbooster.com/) for MongoDB (formerly MongoBooster) is a shell-centric cross-platform GUI tool for MongoDB. It's of great use during developing any application based on mongodb database. 

#### 3.3 Node server

Run below command to start node sever in your machine locally

```
node index.js
```
##### 3.3.1 Nodemon  (optional)

[Nodemon](https://www.npmjs.com/package/nodemon) is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

Run following command locally to install nodemon globally

```
npm install -g nodemon
```

Run below command locally to run node server using nodemon

```
nodemon index.js
```

### Step - 4 

Rest api docs -  [REST Api](/meeting_back/apidoc/index.html) :- /meeting_back/apidoc/index.html

Event api docs -  [Event docs](/meeting_back/eventdoc/index.html) :- /meeting_back/eventdoc/event.html

Note - These links are not hosted. Please access the docs by visiting the directory as mentioned above.

## More about the application (backend)

1) Config :- It consist of application configration such as mongodb uri, production enviornment etc.

2) Controllers :- This is main folder where the logics are implemented. In this folder there are two files usermanageapi.js and meetingapi.js

  2.1) usermanageapi.js - This consist of logic related to user Signup, login, logout, forgotpassword, fetchalluser,           edituserdata, deleteuserdata and singleuserdata. In other words all basic user authentication and authorization are covered.

  2.2) meetingapi.js - This coveres all meeting CRUD realated functions such as creat meeting, update meeting , get all meetings, get meetings by user and delete meetings. 

  Note:- For api docs /meeting_back/apidoc/index.html

3) lib - This folder consist of all custom libs that are used in this app.
  
  3.1) checkLib.js - This libs is used to check if the o/p is empty.

  3.2) emailSend.js - This lib is used to send emails.
  
  3.3) loger.js - We use loger lib to create logs for each functions

  3.4) paramsValidayionLib.js - This is use to valid email and password entered by user using regex.

  3.5) passwordLib.js - We use this lib to encrypt the password entered by user before saving it in db, it is also used for validating the entered passowrd, if that matched with the password in the db. 

  3.6) redisLib.js - It is used to get all online users in the single hash, to set user online and to remove user from online list when it's disconnected.

  3.7) responseLib.js - It is used to structure the api response.

  3.8) socketlib.js - It consist of socket connection using socket.io. It is used to emit events like verifyUser , onlineUsersList etc 

  Note :- For event docs  /meeting_back/eventdoc/event.html

  3.9) timeLib.js - It uses moment.js for time 

  3.10) tokenLib.js - It uses JWT token, to generate token and verify claim.

4) Middleware - Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.

5) Models - This is constist of all db schema that are required. 

6) routes - In this file we define all routes and method of the applications
 
   Note :- Rest api docs -  [REST Api](/meeting_back/apidoc/index.html) :- /meeting_back/apidoc/index.html

           Event api docs -  [Event docs](/meeting_back/eventdoc/index.html) :- /meeting_back/eventdoc/event.html

           These links are not hosted. Please access the docs by visiting the directory as mentioned above.
