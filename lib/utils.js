'use strict';

var Promise = exports.Promise = require('bluebird');
exports._ = require('lodash');
var request = require('request');


exports.request = function(options) {
	return new Promise(function(resolve, reject) {
		request(options, function(error, response, body) {
			if (error) {
				return reject(error);
			}
			// console.log('response', response.statusCode, body);
			resolve(body);
		});
	});
};

exports.formatDate = function(date, options) {
	date = date || new Date();
	options = options || {};
	if (typeof (options) === 'string') {
		options = {
			separator: options
		};
	}

	var separator = typeof (options.separator) === 'string' ? options.separator : '-';
	var utc = options.utc === true ? 'UTC' : '';


	var year = date['get' + utc + 'FullYear']();
	var month = date['get' + utc + 'Month']() + 1;
	var day = date['get' + utc + 'Date']();

	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;

	return [year, month, day].join(separator);
};
