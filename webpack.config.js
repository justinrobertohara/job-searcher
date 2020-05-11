const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/components/Index.jsx',
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'client/src/components')],
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};