
const User = require('../db_resources/usermodel.js')

module.exports = (req, res, next) => {

    console.log(req.body)
    const sessionToken = JSON.parse(req.body.sessionToken)
    //const sessionToken = req.header(sessionToken);
    //const sessionToken = req.headers.authorization.split("")[1];
    //const sessionToken = url.parse(req.url,true).query.sessionToken;
    //const sessionToken = req.headers['sessionToken'];
    //const sessionToken = req.params.sessionToken

    if (sessionToken) {

	    User.find({ sessionToken: sessionToken })
	    .exec()
	    .then(user => {
	      if (user.length !== 1) {
	        return res.status(404).json({
	          message: 'Token does not match any user in the database. Access denied'
	        })
	      } else {
	        next();
	      }
	    })
	    .catch(err => {
	      console.log(err)
	      res.status(500).json({
	        error: err
	      })
	    })

    } else {

      // if no token provided
      res.send({ 
          message: 'No token provided.' 
      })

    }
  }
