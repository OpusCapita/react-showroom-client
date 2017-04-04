#! /usr/bin/env node

'use strict';
var process = require('process');

var execDir = process.cwd();
require('./bin/main.js')(execDir);
