
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
          { from: 'node_modules/oidc-client/dist/oidc-client.min.js', to: 'js' }
      ])
    ]
  },

  devServer: {
      host: `${process.env.BASE_URL}`,
      //host: 'localhost',
      disableHostCheck: true,
      https: {
        key: fs.readFileSync('./certs/dev_localhost.key'),
        cert: fs.readFileSync('./certs/dev_localhost.pem'),
      },
      //public: 'https://localhost:44357',
      public: `https://${process.env.BASE_URL}`,
      publicPath: `https://${process.env.BASE_URL}`
  },

  transpileDependencies: [
    'vuetify'
  ]
}
