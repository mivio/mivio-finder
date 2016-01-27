'use strict';

var Data = require('./data');

function isValidVideo(video) {
	if (!video) {
		return false;
	}

	if (!video.status.embeddable) {
		console.log('\tnot embeddable video', video.sourceId);
		return false;
	}

	var date = new Date(process.env.DATE);

	// console.log('date', video.sourcePublishedAt, new Date(video.sourcePublishedAt));

	var minDate = date.getTime() - 3600 * 1000 * 24 * 30;
	if (video.sourcePublishedAt < minDate) {
		console.log('\ttoo old video', video.sourceId);
		return false;
	}

	Data.helpers.formatVideoDescription(video);

	if (!video.description || video.description.length < 10) {
		console.log('\tno description', video.sourceId);
		// return false;
	}

	return true;
}

module.exports = function(video) {
	if (!isValidVideo(video)) {
		// console.log('invalid video', video.sourceId);
		return;
	}
	// console.log('adding video', video.sourcePublishedAt);

	return Data.control.createVideo(video)
		.then(function(dbvideo) {
			console.log('+ added video ', dbvideo.id);
		}, function(error) {
			console.log('error on creating video', video.id, error.message);
		});
};
