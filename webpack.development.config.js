'use strict';
const path = require('path');
const webpack = require('webpack');
const packageVersion = require('./package.json').version;
let host = require('./serverConfig').host;
let port = require('./serverConfig').port;

module.exports = {
  entry: path.resolve(__dirname, 'www/index-page.js'),
  context: path.resolve(__dirname),
  devtool: 'eval',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'lib'),
    filename: `index.js`,
    library: 'demopage',
    libraryTarget: 'umd'
  },
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
        test: /\.(css|less)$/,
        loader: `style!css?modules&importLoaders=1&` +
        `localIdentName=[name]__[local]__${packageVersion}_[hash:base64:3]` +
        `!postcss-loader!less?sourceMap`,
        include: /\.module\.(css|less)$/
      },
      {
        test: /\.(css|less)$/,
        loader: `style!css!postcss-loader!less?sourceMap`,
        exclude: /\.module\.(css|less)$/
      },
      {
        test: /.jsx?$/,
        loader: 'babel',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'www')
        ],
        plugins: ['transform-runtime']
      }
    ]
  }
};
