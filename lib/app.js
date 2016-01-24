'use strict';

require('dotenv').load();

var utils = require('./utils');
var Promise = utils.Promise;
var countries = (process.env.COUNTRIES || '').split(/[;,| ]+/g);
var findVideos = require('./find_videos');
var filterExistingVideos = require('./filter_existing_videos');
var findVideoDetails = require('./find_video_details');
var addVideo = require('./add_video');

function start() {
	console.log('countries:', countries);
	// return require('./data').createTables();
	return Promise.each(countries, function(country) {
		if (country && country.length === 2) {
			return findVideos(country)
				.then(filterExistingVideos)
				.each(function(video) {
					return findVideoDetails(video).then(addVideo);
				});
		}
	});
}

function onSuccess() {
	console.log('END!');
}

function onError(error) {
	console.log(error);
}

start().then(onSuccess);
