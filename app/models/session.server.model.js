'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Session Schema
 */
var SessionSchema = new Schema({
	mac_address: {
		type: String,
	},
	userId: {
		type: String,
	},
	startTime: {
		type: Date,
		default: Date.now
	},
	endTime: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Session', SessionSchema);