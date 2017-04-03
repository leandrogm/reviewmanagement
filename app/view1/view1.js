'use strict';

angular.module('myApp.view1', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/reviews', {
			templateUrl: 'view1/view1.html',
			controller: 'View1Ctrl'
		});
	}])

	.controller('View1Ctrl', ['$scope', '$filter', 'myService', function ($scope, $filter, myService) {

		myService.get();

		$scope.reviews = {
			items: myService.reviews,
			currentPage: 1,
			pageSize: 3,
			totalPages: 1,
			pages: [],
		}

		$scope.reviews.totalPages = Math.ceil($scope.reviews.items.length / $scope.reviews.pageSize);

		for (var index = 1; index <= $scope.reviews.totalPages; index++) {
			$scope.reviews.pages.push(index);
		}

		$scope.propertyName = 'rating';
		$scope.reverse = true;

		$scope.sortBy = function (propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};

		$scope.sliced = [];
		angular.copy($scope.reviews.items, $scope.sliced);


		$scope.paginate = function (page) {
			var slice = (page - 1) * $scope.reviews.pageSize;
			$scope.reviews.items = $scope.sliced.slice(slice, slice + $scope.reviews.pageSize);
		}
		$scope.paginate(1);

	}]);