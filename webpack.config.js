const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const out = path.join(__dirname, 'dist');

const config = {
  context: path.resolve(__dirname, 'src'),
  target: 'web',
  mode: 'development',
  entry: [
    './app.js'
  ],
  output: {
    path: out,
    filename: '[name].bundle.js',
    // publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 2,
            }
          },
          'sass-loader'
        ]
      },
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
  devtool: 'inline-source-map',
  devServer: {
    port: 4008,
    // open: true,
    contentBase: out,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' })
  ]
};

module.exports = config;
