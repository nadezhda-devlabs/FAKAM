'use strict';

(function() {
	// Devlabsters Controller Spec
	describe('Devlabsters Controller Tests', function() {
		// Initialize global variables
		var DevlabstersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Devlabsters controller.
			DevlabstersController = $controller('DevlabstersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Devlabster object fetched from XHR', inject(function(Devlabsters) {
			// Create sample Devlabster using the Devlabsters service
			var sampleDevlabster = new Devlabsters({
				name: 'New Devlabster'
			});

			// Create a sample Devlabsters array that includes the new Devlabster
			var sampleDevlabsters = [sampleDevlabster];

			// Set GET response
			$httpBackend.expectGET('devlabsters').respond(sampleDevlabsters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.devlabsters).toEqualData(sampleDevlabsters);
		}));

		it('$scope.findOne() should create an array with one Devlabster object fetched from XHR using a devlabsterId URL parameter', inject(function(Devlabsters) {
			// Define a sample Devlabster object
			var sampleDevlabster = new Devlabsters({
				name: 'New Devlabster'
			});

			// Set the URL parameter
			$stateParams.devlabsterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/devlabsters\/([0-9a-fA-F]{24})$/).respond(sampleDevlabster);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.devlabster).toEqualData(sampleDevlabster);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Devlabsters) {
			// Create a sample Devlabster object
			var sampleDevlabsterPostData = new Devlabsters({
				name: 'New Devlabster'
			});

			// Create a sample Devlabster response
			var sampleDevlabsterResponse = new Devlabsters({
				_id: '525cf20451979dea2c000001',
				name: 'New Devlabster'
			});

			// Fixture mock form input values
			scope.name = 'New Devlabster';

			// Set POST response
			$httpBackend.expectPOST('devlabsters', sampleDevlabsterPostData).respond(sampleDevlabsterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Devlabster was created
			expect($location.path()).toBe('/devlabsters/' + sampleDevlabsterResponse._id);
		}));

		it('$scope.update() should update a valid Devlabster', inject(function(Devlabsters) {
			// Define a sample Devlabster put data
			var sampleDevlabsterPutData = new Devlabsters({
				_id: '525cf20451979dea2c000001',
				name: 'New Devlabster'
			});

			// Mock Devlabster in scope
			scope.devlabster = sampleDevlabsterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/devlabsters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/devlabsters/' + sampleDevlabsterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid devlabsterId and remove the Devlabster from the scope', inject(function(Devlabsters) {
			// Create new Devlabster object
			var sampleDevlabster = new Devlabsters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Devlabsters array and include the Devlabster
			scope.devlabsters = [sampleDevlabster];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/devlabsters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDevlabster);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.devlabsters.length).toBe(0);
		}));
	});
}());