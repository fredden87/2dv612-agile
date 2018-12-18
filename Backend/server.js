require('dotenv').config()
const fs = require('fs')
const https = require('https')
const http = require('http')
const app = require('./app')

const port = process.env.PORT || 443

if (process.env.VUE_APP_ENVIRONMENT === 'production') {
  let privateKey = fs.readFileSync('/etc/letsencrypt/live/cscloud482.lnu.se/privkey.pem', 'utf8')
  let certificate = fs.readFileSync('/etc/letsencrypt/live/cscloud482.lnu.se/cert.pem', 'utf8')
  let chain = fs.readFileSync('/etc/letsencrypt/live/cscloud482.lnu.se/chain.pem', 'utf8')
  https.createServer({
    key: privateKey,
    cert: certificate,
    ca: [chain]
  }, app).listen(port)
} else {
  http.createServer(app).listen(3000)
}
