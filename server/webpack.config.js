// webpack.config.js
const path = require('path')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './template/src/main.js')
    },
    output: {
        path: path.resolve(__dirname, './template/public'),
        filename: '[name].bundle.js',
    },
    watch: true,
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
}