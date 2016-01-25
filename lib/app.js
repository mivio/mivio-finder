'use strict';

require('dotenv').load();

var utils = require('./utils');
var _ = utils._;
var Promise = utils.Promise;
var countries = (process.env.COUNTRIES || '').split(/[;,| ]+/g);
var findVideos = require('./find_videos');
var filterExistingVideo = require('./filter_existing_video');
var findVideoDetails = require('./find_video_details');
var addVideo = require('./add_video');

function start() {
	console.log('countries:', countries);
	// return require('./data').createTables();
	return Promise.each(countries, function(country) {
		if (country && country.length === 2) {
			return findVideos(country)
				.filter(filterExistingVideo, {
					concurrency: 1
				})
				.each(findVideoDetails)
				.then(function(videos) {
					return _.sortBy(videos, 'sourcePublishedAt');
				}).each(addVideo);
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
