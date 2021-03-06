const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')

module.exports = {
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                {from: 'node_modules/oidc-client/dist/oidc-client.min.js', to: 'js'}
            ])
        ]
    },

    devServer: {
        //host: `${process.env.BASE_URL}`,
        host: 'localhost',
        disableHostCheck: true,
        https: {},
        public: 'https://localhost:44357',
        //public: `https://${process.env.BASE_URL}`,
    },

    transpileDependencies: [
        'vuetify'
    ]
}
