var nodemailer = require('nodemailer');

function sendMail(settings, callback){
    // var reciever = 'pe222gq@student.lnu.se'; // logged in users email
    var reciever = 'rjosih@hotmail.com'; // logged in users email
    var subject = 'Welcome to the parkinglot';
    var message = 'Hello and welcome :)!!!!!!!!!';
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp@gmail.com',
        secure: false,
        port: 3000,
        auth: {
        user: process.env.email_user,
        pass: process.env.email_password
  },
  tls: {
    rejectUnauthorized: false
}
});

// from the account the mail is sent from
let HelperOptions = {
    from: 'Team 3 <' + process.env.EMAIL_USER + '>',
    to: reciever,
    subject: subject,
    text: message
};

transporter.sendMail(HelperOptions, (error, info) => {
    callback(error, info)
    });
}

  module.exports = { sendMail };