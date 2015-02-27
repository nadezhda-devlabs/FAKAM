'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var devlabsters = require('../../app/controllers/devlabsters.server.controller');

	// Devlabsters Routes
	app.route('/devlabsters')
		.get(devlabsters.list)
		.post(users.requiresLogin, devlabsters.create);

	app.route('/devlabsters/:devlabsterId')
		.get(devlabsters.read)
		.put(users.requiresLogin, devlabsters.hasAuthorization, devlabsters.update)
		.delete(users.requiresLogin, devlabsters.hasAuthorization, devlabsters.delete);

	// Finish by binding the Devlabster middleware
	app.param('devlabsterId', devlabsters.devlabsterByID);
};
