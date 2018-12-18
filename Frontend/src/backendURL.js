
   const backendUrl= process.env.VUE_APP_ENVIRONMENT === 'production'
    ? 'https://cscloud482.lnu.se'
    : 'http://127.0.0.1:3000'
export {backendUrl}