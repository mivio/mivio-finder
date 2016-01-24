'use strict';

var Data = require('./data');

module.exports = function(video) {
	// console.log('adding video', video.title || video.sourceTitle);

	return Data.control.createVideo(video)
		.catch(function(error) {
			console.log('error on creating video', video.id, error.message);
		});
};
