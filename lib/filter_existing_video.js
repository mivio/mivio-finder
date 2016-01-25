'use strict';

var Data = require('./data');

module.exports = function(video) {
	return Data.access.getVideo(video.id)
		.then(function(dbVideo) {
			return !dbVideo;
		});
};
