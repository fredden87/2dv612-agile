require('dotenv').config()

const http = require('http')
const app = require('./app')
const mailModel = require('./mail')

const port = process.env.PORT || 3000
http.createServer(app).listen(port)
console.log('server running on port: ' + port)

// sends the mail
// if this lines are uncommented, the welcome email will send everytime you start server
// mailModel.sendMail(() => {
// })
