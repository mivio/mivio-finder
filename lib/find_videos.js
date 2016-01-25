'use strict';

var utils = require('./utils');
var request = utils.request;
var Data = require('./data');

function filterVideo(video) {
	return video.sourceCountViews > 20000;
}

module.exports = function(country) {
	var date = utils.formatDate().replace(/-/g, '');
	var url = 'https://www.google.com/trends/hotvideos/hotItems?geo=' + country.toUpperCase() + '&hvsm=0&hvd=' + date;
	country = country.toLowerCase();

	return request({
			url: url,
			json: true
		})
		.then(function(data) {
			data = data && data.videoList || []; //.slice(0, process.env.COUNT_VIDEOS || 5) || [];
			return data.map(function(video) {
				return {
					id: Data.helpers.encodeVideoId(video.id, country),
					country: country,
					sourceId: video.id,
					source: 'youtube',
					sourceTitle: video.title,
					sourceCountViews: parseInt(video.totalViewCount.replace(/[, .]/g, '')),
					sourceCountComments: parseInt(video.commentCount.replace(/[, .]/g, '')),
					sourceUsername: video.username
				};
			});
		}).filter(filterVideo);
};
