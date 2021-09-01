const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module : {
    rules : [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use : {
                loader: 'babel-loader',
            }
        },
        {
            test: /\.(png|jpg|svg)$/,
            use: {
                loader: 'url-loader',
            }
        },
        {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
              },
            ],
        },
    ]
},
  plugins : [
    new HtmlWebPackPlugin({
        template: 'index.html',
      })
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};