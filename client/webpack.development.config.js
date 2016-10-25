'use strict';
const path = require('path');
const webpack = require('webpack');
let host = require('./serverConfig').host;
let port = require('./serverConfig').port;

module.exports = {
  entry: path.resolve(path.join(__dirname, 'www', 'index-page.js')),
  context: path.resolve(__dirname),
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'lib'),
    filename: `index.js`,
    library: 'demopage',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  watch: true,
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.HOST': JSON.stringify(host),
      'process.env.PORT': JSON.stringify(port)
    }),
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
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
  postcss: function () {
    return [require('autoprefixer')];
  },
  module: {
    loaders: [
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
      {
        test: /\.less$/,
        loader: 'style!css!postcss-loader!less?sourceMap'
      },
      {
        test: /\.css$/,
        loader: "style!css-loader!postcss-loader"
      },
      {
        test: /.jsx?$/,
        loader: 'babel',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'www')
        ]
      }
    ]
  }
};
