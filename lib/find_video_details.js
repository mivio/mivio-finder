'use strict';

var utils = require('./utils');
var request = utils.request;

module.exports = function(video) {
	var url = 'https://www.googleapis.com/youtube/v3/videos?key=' + process.env.YOUTUBE_API_KEY + '&part=snippet&id=' + video.sourceId;
	return request({
		url: url,
		json: true
	}).then(function(details) {
		if (details && details.items.length > 0) {
			details = details.items[0].snippet;
			video.description = details.description;
			video.sourceChannelId = details.channelId;
			video.sourcePublishedAt = Date.parse(details.publishedAt);
			if (details.categoryId) {
				video.category = parseInt(details.categoryId);
			}
		}
		return video;
	});
};
