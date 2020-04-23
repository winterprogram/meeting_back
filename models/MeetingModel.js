const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../lib/timeLib')

const Meeting = new Schema({
  meetingId: {
    type: String,
    required: true,
    unique: true,
    default: ''
  },
  title: {
    type: String,
    required: true,
    default: ''
  },
  startDate: {
    type: Date,
    default: ''
  },
  endDate: {
    type: Date,
    default: ''
  },

  

  createdBy: {
    type: String,
    default: ''
  },
  createdByEmail: {
    type: String,
    default: '',
    required: true
  },
  createdById: {
    type: String,
    default: '',
    required: true
  },
  location: {
    type: String,
    default: '',
    required: true
  },
  purpose: {
    type: String,
    default: '',
    required: true
  },
  createdFor: {
    type: String,
    default: '',
    required: true
  },
  createdForEmail: {
    type: String,
    default: '',
    required: true
  },
  createdOn: {
    type: Date,
    default: ''
  }
})

module.exports = mongoose.model('Meeting', Meeting)