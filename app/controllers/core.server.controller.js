'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Devlabster = mongoose.model('Devlabster'),
	Session = mongoose.model('Session'),
	_ = require('lodash');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

function callFakamBot(name, online) {
	var https = require('https');

	var options = {
	  host: 'hooks.slack.com',
	  port: 443,
	  path: '/services/T02JCLRNK/B03RKM8R2/ndYQ0haD17oMW0P9LXvrHp3f',
	  method: 'POST'
	};

	var req = https.request(options, function(res) {
	  console.log('statusCode: ', res.statusCode);
	  console.log('headers: ', res.headers);

	  res.on('data', function(d) {
	    process.stdout.write(d);
	  });
	});

	req.on('error', function(e) {
	  console.error(e);
	});

	var message = 'ko!?..';
	if (online) {
		var message = 'Хоп хоп, ' + name + ' тъкмо се появи ФОФИСА';
	} else {
		var message = 'Хоп хоп, ' + name + ' вече не е между нас (ФОФИСА де)';
	}

	var request = {
		'channel': '#fakam-team', 
		'username': 'Fakam-BOT', 
		'text': message
	}
	// write data to request body
	req.write(JSON.stringify(request) + '\n');
	req.end();
}

function callFpSense(callback) {
	var http = require('http');

	var options = {
	  host: '192.168.10.1',
	  port: 80,
	  path: '/status_dhcp_leases.php?fakam=samokurvi',
	  method: 'GET',
	  headers: {
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'Accept-Encoding':'gzip, deflate, sdch',
		'Accept-Language':'en-US,en;q=0.8,bg;q=0.6',
		'Cache-Control':'max-age=0',
		'Connection':'keep-alive',
		'Cookie':'PHPSESSID=7fd8bf7fd35289f26da9c7fdbe963e53',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
	  }
	};

	var response = '';

	var req = http.request(options, function(res) {
	  // console.log('statusCode: ', res.statusCode);
	  // console.log('headers: ', res.headers);

	  res.on('data', function(d) {
	    response += d;
	  });
	  res.on('end', function(d) {
	  	//Remove ugly pfsense shit at the end
	  	response = response.split('<script ')[0];
	    
	    callback(JSON.parse(response));
	  });
	});

	req.on('error', function(e) {
	  console.error(e);
	});

	// write data to request body
	req.write('\n');
	req.end();
}
/*Example response:
  { ip: '192.168.10.211',
    type: 'static',
    mac: '9c:4e:36:58:8f:84',
    start: '',
    end: '',
    hostname: 'dancho_w',
    act: 'static',
    online: 'offline' },
 */
var last_response = {};

/*
 * Parse a row of significance for us (The user is present in our system, log him)
 */
function handleOneDevlabster(devlabster, mac, isOnline) {
	// console.log(new Date());
	// console.log(devlabster);
	
	// Devlabster.findById(devlabster).exec(function(err, session) {
		
		//Save if is online currently!
		devlabster = _.extend(devlabster, {
			isOnline: isOnline
		});
		devlabster.save(function(err) {
			console.log('Saved devlabster ' + devlabster.name + 'online: ' + isOnline);
		});
	// });

	Session.find({'userId': devlabster._id}).sort('-created').exec(function(err, sessions) {
		if (err) {
			console.log(err);
			console.log('error with sessions');
		} else {
			console.log(sessions.length);console.log(mac);console.log(isOnline);
			
			if(sessions.length) {
				if( ! isOnline && typeof(sessions[0].endTime) == 'undefined') {
					//EDIT
					sessions[0] = _.extend(sessions[0], {
						endTime: new Date()
					});

					sessions[0].save(function(err) {
						console.log('This guy just got offline ' + mac);
					});
				} else if( isOnline && typeof(sessions[0].endTime) != 'undefined') {
					//Crete new
					var session = new Session({
						mac_address: mac,
						userId: devlabster._id
					});

					session.save(function(err) {
						console.log("Added new session for " + mac);
					});
				}
			} else {
				if(isOnline) {
					//We create a new session
					var session = new Session({
						mac_address: mac,
						userId: devlabster._id
					});

					session.save(function(err) {
						console.log("Created first session for " + mac);
					});
				}
			}
		}
	});
}

/**
 * getDataFromPfSense Run the parsing of the PfSense data
 * Goes trough the users and searches them in the response
 * if found sends it to the handleOneDevlabster function
 * 
 */
function getDataFromPfSense() {
	//Example usage:
	callFpSense(function(response){

		Devlabster.find().exec(function(err, devlabsters) {
			for (var i1 = devlabsters.length - 1; i1 >= 0; i1--) {
				var devlabsterGuy = devlabsters[i1];
				var isOnline = false;

				//his addresses
				for (var i = devlabsterGuy.mac_addresses.length - 1; i >= 0; i--) {
					var macAddress = devlabsterGuy.mac_addresses[i];

					//check them from the response
					for (var j = response.length - 1; j >= 0; j--) {
						var row = response[j];

						if(row.mac == macAddress)
						{
							if(row.online == 'online') {
								isOnline = true;
							}
						}
					}
					
				}

				if(devlabsterGuy && devlabsterGuy.mac_addresses&& devlabsterGuy.mac_addresses[0])
				{
					handleOneDevlabster(devlabsterGuy, devlabsterGuy.mac_addresses[0], isOnline);
				}
			}
		});

	});
}

//Disabled for now!
// setInterval(getDataFromPfSense, 1000);