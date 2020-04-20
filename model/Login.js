const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokeninfo = new Schema({
    userid: {
        type: String,
        unique: true,
        default: 'default001',
        index: true
    },
    authtoken: {
        type: String,
        default: '',
        index: true
    },
    secreatekey: {
        type: String,
        default: '',
        index: true
    },
    userinfo: {
        type: String
    },
    createdon: {
        type: Date
    }
})

let logintoken = mongoose.model('usertoken', tokeninfo)

module.exports = {
    logintoken: logintoken
}