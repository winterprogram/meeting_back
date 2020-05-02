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
##### 3.2.1 Nodemon  (optional)

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

Rest api docs -  [index.html](/meeting_back/apidoc/index.html) :- /meeting_back/apidoc/index.html

Event api docs -  [index.html](/meeting_back/eventdoc/index.html) :- /meeting_back/eventdoc/index.html

Note - This links are not hosted. Please acces the docs by visiting the directory as mentioned above.

## More about the application (backend)

1) Config :- It consist of application configration such as mongodb uri, production enviornment etc.

2) Controllers :- This is main folder where the logics are implemented. In this folder there are two files usermanageapi.js and meetingapi.js

  2.1) usermanageapi.js - This consist of logic related to user Signup, login, logout, forgotpassword, fetchalluser,           edituserdata, deleteuserdata and singleuserdata. 





