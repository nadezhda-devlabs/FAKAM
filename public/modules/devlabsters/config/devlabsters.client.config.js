'use strict';

// Configuring the Articles module
angular.module('devlabsters').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Devlabsters', 'devlabsters', 'dropdown', '/devlabsters(/create)?');
		Menus.addSubMenuItem('topbar', 'devlabsters', 'List Devlabsters', 'devlabsters');
		Menus.addSubMenuItem('topbar', 'devlabsters', 'New Devlabster', 'devlabsters/create');
	}
]);