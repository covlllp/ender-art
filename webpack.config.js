'use strict'
var path = require('path')

var entryPath = './js/index.js';
module.exports = {
  entry: entryPath,
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'js'),
        loader: 'babel-loader'
      }
    ]
  }
}
