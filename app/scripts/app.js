'use strict';

/**
 * @ngdoc overview
 * @name phrApp
 * @description
 * # phrApp
 *
 * Main module of the application.
 */
angular
  .module('phrApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/help', {
        templateUrl: 'views/help.html',
        controller: 'HelpCtrl',
        controllerAs: 'help'
      })
      .when('/print', {
        templateUrl: 'views/print.html',
        controller: 'PrintCtrl',
        controllerAs: 'print'
      })
      .when('/weight', {
        templateUrl: 'views/weight.html',
        controller: 'WeightCtrl',
        controllerAs: 'weight'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
