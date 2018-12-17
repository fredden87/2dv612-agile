require('dotenv').config()
// const fs = require('fs')
// const https = require('https')
const http = require('http')
const app = require('./app')
const mailModel = require('./mail')

const port = process.env.PORT || 3000
http.createServer(app).listen(port)
console.log('server running on port: ' + port)
// var privateKey = fs.readFileSync('key.pem')
// var certificate = fs.readFileSync('cert.pem')

// https.createServer({
//   key: privateKey,
//   cert: certificate
// }, app).listen(port)
