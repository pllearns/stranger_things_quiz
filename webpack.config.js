var path = require('path')

module.exports = {
  entry: path.join( __dirname, 'src/public/javascripts/main.js' ),
  output: {
    path: path.join( __dirname, 'dist/public/javascripts'),
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          'presets': ['es2015']
        }
      }
    ]
  }
};
