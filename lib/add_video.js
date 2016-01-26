'use strict';

var Data = require('./data');

function isValidVideo(video) {
	if (!video) {
		return false;
	}

	var date = new Date(process.env.DATE);

	if (video.sourcePublishedAt < date.getTime() - 3600 * 1000 * 24 * 2) {
		return false;
	}

	Data.helpers.formatVideoDescription(video);

	if (!video.description || video.description.length < 10) {
		return false;
	}

	return true;
}

module.exports = function(video) {
	if (!isValidVideo(video)) {
		console.log('invalid video', video.sourceId);
	}
	// console.log('adding video', video.sourcePublishedAt);

	return Data.control.createVideo(video)
		.catch(function(error) {
			console.log('error on creating video', video.id, error.message);
		});
};
