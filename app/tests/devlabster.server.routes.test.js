'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Devlabster = mongoose.model('Devlabster'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, devlabster;

/**
 * Devlabster routes tests
 */
describe('Devlabster CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Devlabster
		user.save(function() {
			devlabster = {
				name: 'Devlabster Name'
			};

			done();
		});
	});

	it('should be able to save Devlabster instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devlabster
				agent.post('/devlabsters')
					.send(devlabster)
					.expect(200)
					.end(function(devlabsterSaveErr, devlabsterSaveRes) {
						// Handle Devlabster save error
						if (devlabsterSaveErr) done(devlabsterSaveErr);

						// Get a list of Devlabsters
						agent.get('/devlabsters')
							.end(function(devlabstersGetErr, devlabstersGetRes) {
								// Handle Devlabster save error
								if (devlabstersGetErr) done(devlabstersGetErr);

								// Get Devlabsters list
								var devlabsters = devlabstersGetRes.body;

								// Set assertions
								(devlabsters[0].user._id).should.equal(userId);
								(devlabsters[0].name).should.match('Devlabster Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Devlabster instance if not logged in', function(done) {
		agent.post('/devlabsters')
			.send(devlabster)
			.expect(401)
			.end(function(devlabsterSaveErr, devlabsterSaveRes) {
				// Call the assertion callback
				done(devlabsterSaveErr);
			});
	});

	it('should not be able to save Devlabster instance if no name is provided', function(done) {
		// Invalidate name field
		devlabster.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devlabster
				agent.post('/devlabsters')
					.send(devlabster)
					.expect(400)
					.end(function(devlabsterSaveErr, devlabsterSaveRes) {
						// Set message assertion
						(devlabsterSaveRes.body.message).should.match('Please fill Devlabster name');
						
						// Handle Devlabster save error
						done(devlabsterSaveErr);
					});
			});
	});

	it('should be able to update Devlabster instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devlabster
				agent.post('/devlabsters')
					.send(devlabster)
					.expect(200)
					.end(function(devlabsterSaveErr, devlabsterSaveRes) {
						// Handle Devlabster save error
						if (devlabsterSaveErr) done(devlabsterSaveErr);

						// Update Devlabster name
						devlabster.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Devlabster
						agent.put('/devlabsters/' + devlabsterSaveRes.body._id)
							.send(devlabster)
							.expect(200)
							.end(function(devlabsterUpdateErr, devlabsterUpdateRes) {
								// Handle Devlabster update error
								if (devlabsterUpdateErr) done(devlabsterUpdateErr);

								// Set assertions
								(devlabsterUpdateRes.body._id).should.equal(devlabsterSaveRes.body._id);
								(devlabsterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Devlabsters if not signed in', function(done) {
		// Create new Devlabster model instance
		var devlabsterObj = new Devlabster(devlabster);

		// Save the Devlabster
		devlabsterObj.save(function() {
			// Request Devlabsters
			request(app).get('/devlabsters')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Devlabster if not signed in', function(done) {
		// Create new Devlabster model instance
		var devlabsterObj = new Devlabster(devlabster);

		// Save the Devlabster
		devlabsterObj.save(function() {
			request(app).get('/devlabsters/' + devlabsterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', devlabster.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Devlabster instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Devlabster
				agent.post('/devlabsters')
					.send(devlabster)
					.expect(200)
					.end(function(devlabsterSaveErr, devlabsterSaveRes) {
						// Handle Devlabster save error
						if (devlabsterSaveErr) done(devlabsterSaveErr);

						// Delete existing Devlabster
						agent.delete('/devlabsters/' + devlabsterSaveRes.body._id)
							.send(devlabster)
							.expect(200)
							.end(function(devlabsterDeleteErr, devlabsterDeleteRes) {
								// Handle Devlabster error error
								if (devlabsterDeleteErr) done(devlabsterDeleteErr);

								// Set assertions
								(devlabsterDeleteRes.body._id).should.equal(devlabsterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Devlabster instance if not signed in', function(done) {
		// Set Devlabster user 
		devlabster.user = user;

		// Create new Devlabster model instance
		var devlabsterObj = new Devlabster(devlabster);

		// Save the Devlabster
		devlabsterObj.save(function() {
			// Try deleting Devlabster
			request(app).delete('/devlabsters/' + devlabsterObj._id)
			.expect(401)
			.end(function(devlabsterDeleteErr, devlabsterDeleteRes) {
				// Set message assertion
				(devlabsterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Devlabster error error
				done(devlabsterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Devlabster.remove().exec();
		done();
	});
});