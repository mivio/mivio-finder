'use strict';

var utils = require('./utils');
var request = utils.request;
var Data = require('./data');

function filterVideo(video) {
	var minViews = process.env.MIN_VIEWS || 20000;

	if (video.sourceCountViews < minViews) {
		return false;
	}
	if (video.sourceCountViews < minViews * 10) {
		if (!utils.isLanguage(video.sourceTitle, video.country)) {
			return false;
		}
	}
	return true;
}

module.exports = function(country, date, tries) {
	tries = tries || 0;
	date = (date || process.env.DATE || utils.formatDate()).replace(/-/g, '');
	var url = 'https://www.google.com/trends/hotvideos/hotItems?geo=' + country.toUpperCase() + '&hvsm=0&hvd=' + date;
	country = country.toLowerCase();

	return request({
			url: url,
			json: true
		})
		.then(function(data) {
			data = data && data.videoList || []; //.slice(0, process.env.COUNT_VIDEOS || 5) || [];
			data = data.slice(0, 50);

			if (data.length === 0 && tries === 0) {
				date = new Date();
				date.setDate(date.getDate() - 1);
				return module.exports(country, utils.formatDate(date), 1);
			}

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
