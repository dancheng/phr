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
    'ngTouch',
    'angucomplete-alt',
    'datetimepicker'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          "initialData": ['MemberSvc', function(MemberSvc) {
            return MemberSvc.getData(10000).then(function(response) {
              return response.data;
            });
          }]
        }
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
