'use strict';
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
let host = require('./serverConfig').host;
let port = require('./serverConfig').port;

module.exports = {
  entry: path.resolve(path.join(__dirname, './src/client/index.js')),
  output: {
    path: path.resolve(__dirname, 'lib'),
    publicPath: `http://${host}:${port}/`,
    filename: `bundle.js`,
    library: 'demopage',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.HOST': JSON.stringify(host),
      'process.env.PORT': JSON.stringify(port)
    }),
    new WriteFilePlugin()
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     // don't show unreachable variables etc
    //     warnings: false,
    //     drop_console: true,
    //     unsafe: true
    //   }
    // })
  ],

  resolve: {
    root: path.join(__dirname, "node_modules"),
    fallback: [path.join(__dirname, "node_modules")],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.js']
  },

  resolveLoader: {
    fallback: [path.join(__dirname, "node_modules")],
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  externals: {
    'react': 'React',
    // 'react-dom': 'ReactDOM'
  },

  postcss: function () {
        return [require('autoprefixer')];
  },

  module: {
    loaders: [
      // {
      //   test: require.resolve("react-dom"), loader: "expose?$!expose?ReactDOM"
      // },
      {
        test   : /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      },
      {
        include: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      },
      { test: /\.less$/, loader: 'style!css?sourceMap!postcss-loader!less?sourceMap'},
      {
        test: /\.css$/,
        loader: "style!css-loader?sourceMap!postcss-loader"
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ]
      }
    ]
  }
};
