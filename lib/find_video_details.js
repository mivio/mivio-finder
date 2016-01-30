'use strict';

var utils = require('./utils');
var request = utils.request;

module.exports = function(video) {
	var url = 'https://www.googleapis.com/youtube/v3/videos?key=' + process.env.YOUTUBE_API_KEY + '&part=snippet,status&id=' + video.sourceId;
	return request({
		url: url,
		json: true
	}).then(function(details) {
		if (details && details.items.length > 0) {
			video.status = details.items[0].status;
			details = details.items[0].snippet;
			video.description = details.description;
			video.sourceChannelId = details.channelId;
			video.sourcePublishedAt = Date.parse(details.publishedAt);
			if (details.categoryId) {
				video.category = parseInt(details.categoryId);
			}
			var maxt = 0;
			for (var prop in details.thumbnails) {
				var th = details.thumbnails[prop];
				if (th.width > maxt) {
					maxt = th.width;
					video.sourceImage = th.url;
				}
			}
		}
		return video;
	});
};
