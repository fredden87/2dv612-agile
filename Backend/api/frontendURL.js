
   const frontendUrl= process.env.VUE_APP_ENVIRONMENT === 'production'
    ? 'http://194.47.206.229:8080'
    : 'http://127.0.0.1:8080'
module.exports=frontendUrl