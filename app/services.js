angular.module('myApp.services', [])

    .service('myService', function ($q) {
        'use strict';

        var STORAGE_ID = 'reviews-angularjs';

        var store = {
            reviews: [],

            _getFromLocalStorage: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            _saveToLocalStorage: function (reviews) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(reviews));
            },

            get: function () {
                var deferred = $q.defer();

                angular.copy(store._getFromLocalStorage(), store.reviews);
                deferred.resolve(store.reviews);

                return deferred.promise;
            },

            insert: function (review) {
                var deferred = $q.defer();

                store.reviews.push(review);

                store._saveToLocalStorage(store.reviews);
                deferred.resolve(store.reviews);

                return deferred.promise;
            }
        };

        return store;
    });