'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Devlabster Schema
 */
var DevlabsterSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Devlabster name',
		trim: true
	},
	mac_addresses: [{
		type: String
	}],
	skype: {
		type: String,
	},
	slack: {
		type: String,
	},
	email: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Devlabster', DevlabsterSchema);