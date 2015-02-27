'use strict';

//Setting up route
angular.module('devlabsters').config(['$stateProvider',
	function($stateProvider) {
		// Devlabsters state routing
		$stateProvider.
		state('listDevlabsters', {
			url: '/devlabsters',
			templateUrl: 'modules/devlabsters/views/list-devlabsters.client.view.html'
		}).
		state('createDevlabster', {
			url: '/devlabsters/create',
			templateUrl: 'modules/devlabsters/views/create-devlabster.client.view.html'
		}).
		state('viewDevlabster', {
			url: '/devlabsters/:devlabsterId',
			templateUrl: 'modules/devlabsters/views/view-devlabster.client.view.html'
		}).
		state('editDevlabster', {
			url: '/devlabsters/:devlabsterId/edit',
			templateUrl: 'modules/devlabsters/views/edit-devlabster.client.view.html'
		});
	}
]);