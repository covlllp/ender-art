'use strict'
var path = require('path')

var entryPath = './src/js/index.js';

module.exports = {
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.scss']
  },
  entry: entryPath,
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src', 'js'),
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
}
