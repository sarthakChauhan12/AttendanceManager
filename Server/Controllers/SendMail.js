const nodemailer = require("nodemailer");

const sendMail = (to, subject, text) => {
  const msg = {
    from: "sarthakchauhan579@gmail.com",
    to: to,
    subject: subject,
    text: text
  }

  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "sarthakchauhan579@gmail.com",
      pass: "cdnsujfatmpqdyxw"
    },
    port: 465,
    host: 'smtp.gmail.com'
  })
  .sendMail(msg, (err) => {
    if(err) {
      return console.log('Error Occurs',err);
    } else {
      return console.log('Email sent');
    }
})}

module.exports = sendMail;