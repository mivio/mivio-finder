'use strict';

var utils = require('./utils');
var Promise = utils.Promise;
var Data = require('./data');

module.exports = function(videos) {
	console.log('filter videos', videos.length);
	return Promise.map(videos, function(video) {
		return Data.access.getVideo(video.id)
			.then(function(dbVideo) {
				if (!dbVideo) {
					return video;
				}
			});
	}, {
		concurrency: 1
	}).filter(function(video) {
		return !!video;
	});
};
