const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'chakladar.sandeep.14et1151@gmail.com',
    pass: 'examidea123'
  }
})

let mailOptions = {
  from: 'chakladar.sandeep.14et1151@gmail.com',
  to: '',
  html: ''
}

let emailSend = (email, content) => {
  mailOptions.to = email
  mailOptions.html = content
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email Sent' + info.response);
    }
  })
}

module.exports = {
  emailSend: emailSend
}
