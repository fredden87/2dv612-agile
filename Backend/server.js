require('dotenv').config()
const fs = require('fs')
const https = require('https')
const http = require('http')
const app = require('./app')
const mailModel = require('./mail')

const port = process.env.PORT || 3000
// http.createServer(app).listen(port)
// console.log('server running on port: ' + port)
var privateKey = fs.readFileSync('/etc/letsencrypt/live/cscloud482.lnu.se/fullchain.pem')
var certificate = fs.readFileSync('/etc/letsencrypt/live/cscloud482.lnu.se/privkey.pem')

// - Congratulations! Your certificate and chain have been saved at:
// /etc/letsencrypt/live/cscloud482.lnu.se/fullchain.pem
// Your key file has been saved at:
// /etc/letsencrypt/live/cscloud482.lnu.se/privkey.pem

https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(port)
