const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

module.exports = {
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/, loader: "style-loader!css-loader"
      },
      { test: /\.less$/, loader: 'style!css!less'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        //exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [/*'transform-object-assign',*/ 'transform-decorators-legacy']
          // plugins: ['transform-runtime']
        }
      }
    ]
  }
}

// const commonConfig = {
  // bail: true,
  // plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.ContextReplacementPlugin(
    //   new RegExp('\\' + path.sep + 'node_modules\\' + path.sep + 'moment\\' + path.sep + 'locale'),
    //   /en|de/
    // ),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     // don't show unreachable variables etc
    //     warnings: false,
    //     drop_console: true,
    //     unsafe: true
    //   }
    // }),
  //   new webpack.ProvidePlugin({
  //     'Promise': 'polyfill-promise'
  //   })
  // ],

  // resolve: {
  //   modulesDirectories: ['node_modules'],
  //   extensions: ['', '.json', '.jsx', '.js']
  // },
  //
  // resolveLoader: {
  //   modulesDirectories: ['node_modules'],
  //   moduleTemplates: ['*-loader', '*'],
  //   extensions: ['', '.js']
  // },

// };

// module.exports = [
//   _.extend(
//     prodConfig,
//     commonConfig
//   ),
//
//   _.extend(
//     demo,
//     commonConfig
//   )
// ];

