const fs = require("fs");

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync("./certs/localhost-key.pem"),
      cert: fs.readFileSync("./certs/localhost.pem")
    },
    public: 'https://localhost:8080/'
  },
  publicPath: process.env.VUE_APP_BASE_ROUTE,
  outputDir: process.env.VUE_APP_BUILD_DIR_NAME,
  configureWebpack: {
    devtool: 'source-map'
  },
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ]
}
