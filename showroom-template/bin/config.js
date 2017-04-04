'use strict';

let path = require('path');

module.exports = {
  templates: {
    appBase: path.join(__dirname, '../templates/app'),
    components: path.join(__dirname, '../templates/components'),
  },
  componentsPath: 'src/client/components'
};
