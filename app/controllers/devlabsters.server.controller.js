'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Devlabster = mongoose.model('Devlabster'),
	_ = require('lodash');

/**
 * Create a Devlabster
 */
exports.create = function(req, res) {
	var devlabster = new Devlabster(req.body);

	devlabster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devlabster);
		}
	});
};

/**
 * Show the current Devlabster
 */
exports.read = function(req, res) {
	res.jsonp(req.devlabster);
};

/**
 * Update a Devlabster
 */
exports.update = function(req, res) {
	var devlabster = req.devlabster ;

	devlabster = _.extend(devlabster , req.body);

	devlabster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devlabster);
		}
	});
};

/**
 * Delete an Devlabster
 */
exports.delete = function(req, res) {
	var devlabster = req.devlabster ;

	devlabster.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devlabster);
		}
	});
};

/**
 * List of Devlabsters
 */
exports.list = function(req, res) { 
	Devlabster.find().sort('-created').populate('user', 'displayName').exec(function(err, devlabsters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(devlabsters);
		}
	});
};

/**
 * Devlabster middleware
 */
exports.devlabsterByID = function(req, res, next, id) { 
	Devlabster.findById(id).populate('user', 'displayName').exec(function(err, devlabster) {
		if (err) return next(err);
		if (! devlabster) return next(new Error('Failed to load Devlabster ' + id));
		req.devlabster = devlabster ;
		next();
	});
};

/**
 * Devlabster authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.devlabster.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
