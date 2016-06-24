/**
 * Created by arjunMitraReddy on 6/23/2016.
 */
(function() {
    'use strict';
    angular.module('ticker')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                url: '/test',
                templateUrl: 'client/ticker.html',
                controller: 'tickerController',
                controllerAs: 'tckrCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }
})();