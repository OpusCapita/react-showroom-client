Using IE you can face shimming problems (some js language features are missing in browser interpreter).
Issues like these could be solved using _polyfills_.

As we use *webpack*, polyfilling coud be achieved by using:
* ProvidePlugin (https://webpack.github.io/docs/list-of-plugins.html#provideplugin)
* PolyfillsPlugin (https://www.npmjs.com/package/webpack-polyfills-plugin)

Examples (fix of Promise and Object.assign problems under IE)
webpack.config.js:
============================
var PolyfillsPlugin = require('webpack-polyfills-plugin');
.....
module.exports = {
    ...
    plugins:[
         new webpack.ProvidePlugin({
              'Promise': 'polyfill-promise'
            }),
            new PolyfillsPlugin([
              'Object/assign'
            ])
    ]
}

*Note*:
-----------------------------
Please try to avoid using such things as _Object.assign_, _Promise_ (native one built in es6) e.t.c
