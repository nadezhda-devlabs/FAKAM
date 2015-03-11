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

function getOnlineMessage(name) {
	var messages = [
		'Хоп хоп, :name тъкмо се появи ФОФИСА',
		'Добро утрооо :name!',
		':name вече е ФОФИСА',
		'Виждам виждам.. :name',
		'Тихо, :name вече е тук!',
		'Ето :name се задава!',
		':name вече е на линия',
		':name е тук!',
		':name дойде!',
		'Здравеееей :name!',
		'Индивидът :name вече се намира на територията на ФОФИСА!',
		'Вашият скъп колега :name е вече тук!',
	];

	return parseMessage(getOneRandom(messages), name);
}

function getOfflineMessage(name) {
	var messages = [
		'Хоп хоп, :name вече не е ФОФИСА',
		'Довиждане :name!',
		':name вече не е във ФОФИСА',
		'Виждам на :name гърба, чаоо',
		':name не е вече тук!',
		':name си отива!',
		':name вече не е на линия',
		':name не е тук!',
		':name е offline!',
		'Чааааааоооо :name!',
		'Индивидът :name вече не се намира на територията на ФОФИСА!',
		'Вашият скъп колега :name вече не е тук!',
	];

	return parseMessage(getOneRandom(messages), name);
}

function getOneRandom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function parseMessage(message, name) {
	return message.replace(':name', name);
}

function callFakamBot(name, online) {
	var https = require('https');

	var options = {
	  host: 'hooks.slack.com',
	  port: 443,
	  path: '/services/T02JCLRNK/B03RKM8R2/ndYQ0haD17oMW0P9LXvrHp3f',
	  method: 'POST'
	};

	var req = https.request(options, function(res) {
	  // console.log('statusCode: ', res.statusCode);
	  // console.log('headers: ', res.headers);

	  res.on('data', function(d) {
	    process.stdout.write(d);
	  });
	});

	req.on('error', function(e) {
	  console.error(e);
	});

	var message = 'ko!?..';
	if (online) {
		message = getOnlineMessage(name);
	} else {
		message = getOfflineMessage(name);
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

var cookieString = '';

function callFpSense(callback) {
	var https = require('https');
	
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
	var options = {
	  host: '192.168.10.1',
	  rejectUnhauthorized: false,
	  port: 443,
	  path: '/status/status_dhcp_leases_tweaked.php?fakam=samokurvi',
	  method: 'GET',
	  headers: {
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'Accept-Encoding':'gzip, deflate, sdch',
		'Accept-Language':'en-US,en;q=0.8,bg;q=0.6',
		'Cache-Control':'max-age=0',
		'Connection':'keep-alive',
		'Cookie': cookieString,
		'User-Agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
	  }
	};

	var response = '';
	
	var req = https.request(options, function(res) {

	  var hasCookie = res.headers['set-cookie'] && res.headers['set-cookie'][0];
	  if(hasCookie) {
	  	//Get first cookie
	  	cookieString = res.headers['set-cookie'][0].split(';')[0];
	  }

	  res.on('data', function(d) {
	    response += d;
	  });
	  res.on('end', function(d) {
	  	//If error code was not 200 discard this request - server returned error
	  	//Possible cause: session has expired and a new cookie needs to be sent
	  	if(res.statusCode != 200) {
	  		console.log('Request fetched an error, possibly new session on the server...');
	  		return;
	  	}
	  	
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


Devlabster.find().exec(function(err, devlabsters) {
	if( ! devlabsters.length) {
		//IMPORT DEVLABSTERS!!!
		var sampleData = [
		    {
		      id: 1,
		      name: "Жан",
		      slack: "https://devlabs.slack.com/messages/@zhan/",
		      skype: "dagoburt",
		      mail: "zhan@devlabs.bg",
		      profile_pic: "img/zhan.jpg",
		      drugi_neshta: "mac",
		      mac_addresses: [
		          "9c:b7:0d:69:ac:44",
		          "10:a5:d0:6e:4a:4f",
		      ]
		    },

		    {
		      id: 2,
		      name: "Веско",
		      slack: "https://devlabs.slack.com/messages/@veselin/",
		      skype: "cryness",
		      mail: "veselin@devlabs.bg",
		      profile_pic: "img/vesko.jpg",
		      drugi_neshta: "mac",
		      mac_addresses: [
		          "a0:88:69:14:28:9b",
		          "98:f1:70:39:47:a1",
		      ]
		    },
		    {
		      id: 3,
		      name: "Гого",
		      slack: "https://devlabs.slack.com/messages/@goranstoyanov/",
		      skype: "tier90",
		      mail: "goran@devlabs.bg",
		      profile_pic: "img/gogo.jpg",
		      drugi_neshta: "mac",
		      mac_addresses: [
		          "48:d7:05:b6:8a:3d",
		          "cc:c3:ea:21:86:c5",
		      ]
		    },
		    {
		      id: 4,
		      name: "Дани",
		      slack: "https://devlabs.slack.com/messages/@dani/",
		      skype: "head_shoter1",
		      mail: "daniel@24ins.bg",
		      profile_pic: "img/dani.jpg",
		      drugi_neshta: "mac",
		      mac_addresses: [
		          "08:3e:8e:52:54:81",
		          "00:03:aa:e0:79:dd",
		      ]
		    }
		];

		for (var i = sampleData.length - 1; i >= 0; i--) {
			var oneGuy = sampleData[i];

			var insertDevlabster = new Devlabster(oneGuy);

			insertDevlabster.save(function(err) {
				console.log("inserted guy");
			});
		};
		

	} else {
		console.log('we aleready have data ! yeye');
	}
});

/*
 * Parse a row of significance for us (The user is present in our system, log him)
 */
function handleOneDevlabster(devlabster, mac, isOnline) {
	var status = 'active';
	if( ! isOnline) {
		//15 min
		var awayTime = 15 * 60 * 1000;

		var seenSoon = (Date.now() - devlabster.lastSeen) < awayTime;

		//Handle away
		if(devlabster.lastSeen && seenSoon) {
			status = 'away';
		} else {
			status = 'offline';
		}
	}

	console.log(devlabster.name + ' is ' + status);

	//Save status
	devlabster = _.extend(devlabster, {
		isOnline: isOnline,
		status: status
	});

	var isAway = status == 'away';
	if(isOnline && ! isAway) {
		devlabster.lastSeen = Date.now();
	}

	devlabster.save(function(err) {
		// console.log('Saved devlabster ' + devlabster.name + ', online: ' + isOnline);
	});

	if(status == 'away') {
		//on away status don't change session or send to slackbot yet
		return;
	}

	Session.find({'userId': devlabster._id}).sort('-created').exec(function(err, sessions) {
		if (err) {
			console.log(err);
			console.log('error with sessions');
		} else {
			if(sessions.length) {
				if( ! isOnline && typeof(sessions[0].endTime) == 'undefined') {
					//EDIT
					sessions[0] = _.extend(sessions[0], {
						endTime: new Date()
					});

					sessions[0].save(function(err) {
						console.log('This guy just got offline ' + mac);
						callFakamBot(devlabster.name, false);
					});

				} else if( isOnline && typeof(sessions[0].endTime) != 'undefined') {
					//Crete new
					var session = new Session({
						mac_address: mac,
						userId: devlabster._id
					});

					session.save(function(err) {
						console.log("Added new session for " + mac);
						callFakamBot(devlabster.name, true);
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
						callFakamBot(devlabster.name, true);
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
	console.log(' --- Data --- ');
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
setInterval(getDataFromPfSense, 5000);