const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './utils/externalApi.js',
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'circleMenu',
    libraryTarget:'umd'
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          // presets: ['env'],
          plugins: ["add-module-exports", "transform-object-rest-spread"]
        }
      }
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['lib']), //cleans the dist folder
  ]
};

module.exports = config;