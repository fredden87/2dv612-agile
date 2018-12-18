module.exports = {
 // will probably need to adapt this to production...
    devServer: {
      open: process.platform === 'darwin',
     // host: '0.0.0.0',
      port: 8080,
      https: process.env.NODE_ENV === 'production'
      ? true
      : false,
      hotOnly: false,
    },
      baseUrl: process.env.NODE_ENV === 'production'
        ? 'https://194.47.206.229:8080/'
        : 'http://127.0.0.1:8080/'
    
  }