'use strict';

var data = require('mivio-data');

exports.access = new data.AccessService();
exports.control = new data.ControlService();
exports.helpers = data.helpers;
exports.createTables = data.createTables;
