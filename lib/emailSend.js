const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'rubitwallet@gamil.com',
    pass: 'examidea123'
  }
})

let mailOptions = {
  from: 'newreply@meetingedwisor.com,',
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
