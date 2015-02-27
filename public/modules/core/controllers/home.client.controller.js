'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);


$('img.home-head').on('hover',function(){
	$('span.hidden').css('display','block');
});