'use strict';

var data = require('trevid-data');

exports.access = new data.AccessService();
exports.control = new data.ControlService();
exports.helpers = data.helpers;
