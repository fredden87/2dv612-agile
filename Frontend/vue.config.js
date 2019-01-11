module.exports = {
  // will probably need to adapt this to production...
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: process.env.VUE_APP_ENVIRONMENT === 'production',
    hotOnly: false
  },
  baseUrl: process.env.VUE_APP_ENVIRONMENT === 'production'
    ? 'https://194.47.206.229:8080/'
    : '/'

}
