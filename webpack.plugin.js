const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  target: "web",
  entry: {
    app: './oMenu.js',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'oMenu',
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
                    presets: ['env']
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
