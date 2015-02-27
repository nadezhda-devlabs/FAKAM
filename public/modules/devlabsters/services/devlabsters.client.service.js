'use strict';

//Devlabsters service used to communicate Devlabsters REST endpoints
angular.module('devlabsters').factory('Devlabsters', ['$resource',
	function($resource) {
		return $resource('devlabsters/:devlabsterId', { devlabsterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);