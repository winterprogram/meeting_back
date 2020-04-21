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

let logintokenad = mongoose.model('admintoken', tokeninfo)

module.exports = {
    logintokenad: logintokenad
}