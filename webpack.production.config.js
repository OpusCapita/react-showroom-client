const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    ActivityInformation: path.join(__dirname, './src/client/components/ActivityInformation'),
    ActivityLogger: path.join(__dirname, './src/client/components/ActivityLogger')
  },
  output: {
    path: path.resolve(__dirname, 'build/client/components'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },

  //exclude empty dependencies, require for Joi
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  bail: true,

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ContextReplacementPlugin(
      new RegExp('\\' + path.sep + 'node_modules\\' + path.sep + 'moment\\' + path.sep + 'locale'),
      /en|de/
    ),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        // don't show unreachable variables etc
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.jsx', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        include: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/, loader: "style-loader!css-loader"
      },
      { test: /\.less$/, loader: 'style!css!less'},
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
      }
    ]
  }
};
