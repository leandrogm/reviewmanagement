'use strict';

angular.module('myApp.view2', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/create', {
			templateUrl: 'view2/view2.html',
			controller: 'View2Ctrl'
		});
	}])

	.controller('View2Ctrl', ['$scope', '$location', 'myService', function ($scope, $location, myService) {
		$scope.createReview = function () {
			myService.insert($scope.review).then(function () {
				$location.path("/reviews");
			});
		}
	}])