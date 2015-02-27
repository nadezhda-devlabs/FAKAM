'use strict';

// Devlabsters controller
angular.module('devlabsters').controller('DevlabstersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Devlabsters',
	function($scope, $stateParams, $location, Authentication, Devlabsters) {
		$scope.authentication = Authentication;

		// Create new Devlabster
		$scope.create = function() {
			// Create new Devlabster object
			var devlabster = new Devlabsters ({
				name: this.name,
				slack: this.slack,
				skype: this.skype,
				mail: this.mail,
				photo: this.photo,
				mac_addresses: JSON.parse(this.mac_addresses)
			});

			// Redirect after save
			devlabster.$save(function(response) {
				$location.path('devlabsters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Devlabster
		$scope.remove = function(devlabster) {
			if ( devlabster ) { 
				devlabster.$remove();

				for (var i in $scope.devlabsters) {
					if ($scope.devlabsters [i] === devlabster) {
						$scope.devlabsters.splice(i, 1);
					}
				}
			} else {
				$scope.devlabster.$remove(function() {
					$location.path('devlabsters');
				});
			}
		};

		// Update existing Devlabster
		$scope.update = function() {
			var devlabster = $scope.devlabster;

			devlabster.$update(function() {
				$location.path('devlabsters/' + devlabster._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Devlabsters
		$scope.find = function() {
			$scope.devlabsters = Devlabsters.query();
		};

		// Find existing Devlabster
		$scope.findOne = function() {
			$scope.devlabster = Devlabsters.get({ 
				devlabsterId: $stateParams.devlabsterId
			});
		};
	}
]);