'use strict';

/**
 * @ngdoc overview
 * @name phrApp
 * @description
 * # phrApp
 *
 * Main module of the application.
 */
var app = angular
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
          "initialData": ['$q', 'MemberSvc', 'AlertSvc', function($q, MemberSvc, AlertSvc) {
            return $q.all({
              member: MemberSvc.getData(10000),
              alerts: AlertSvc.getData(10000)
            }).then(function(data) {
console.log('main data', data);
              return { member: data.member.data, alerts: data.alerts.data };
            });

          }]
        }
      })
      .when('/help', {
        templateUrl: 'views/help.html',
        controller: 'HelpCtrl',
        controllerAs: 'help'
      })
      .when('/weight', {
        templateUrl: 'views/weight.html',
        controller: 'WeightCtrl',
        controllerAs: 'weight',
        resolve: {
          "initialData": ['MemberSvc', function(MemberSvc) {
            return MemberSvc.getData(10000).then(function(response) {
              return response.data;
            });
          }]
        }
      })
      .when('/bp', {
        templateUrl: 'views/bp.html',
        controller: 'BpCtrl',
        controllerAs: 'bp',
        resolve: {
          "initialData": ['MemberSvc', function(MemberSvc) {
            return MemberSvc.getData(10000).then(function(response) {
              return response.data;
            });
          }]
        }
      })
      .when('/hr', {
        templateUrl: 'views/hr.html',
        controller: 'HrCtrl',
        controllerAs: 'hr',
        resolve: {
          "initialData": ['MemberSvc', function(MemberSvc) {
            return MemberSvc.getData(10000).then(function(response) {
              return response.data;
            });
          }]
        }
      })
      .when('/medications', {
        templateUrl: 'views/medications.html',
        controller: 'MedicationsCtrl',
        controllerAs: 'medications',
        resolve: {
          "initialData": ['$q', 'MemberSvc', 'RxNormSvc', function($q, MemberSvc, RxNormSvc) {
            return $q.all({
              member: MemberSvc.getData(10000),
              rxnorm: RxNormSvc.getData()
            }).then(function(data) {
              return { member: data.member.data, rxnorm: data.rxnorm.data.concepts };
            });

          }]
        }
      })
      .when('/procedures', {
        templateUrl: 'views/procedures.html',
        controller: 'ProceduresCtrl',
        controllerAs: 'procedures',
        resolve: {
          "initialData": ['$q', 'MemberSvc', 'SnomedSvc', function($q, MemberSvc, SnomedSvc) {
            return $q.all({
              member: MemberSvc.getData(10000),
              snomed: SnomedSvc.getData('procedure')
            }).then(function(data) {
              return { member: data.member.data, snomed: data.snomed.data.concepts };
            });

          }]
        }
      })
      .when('/conditions', {
        templateUrl: 'views/conditions.html',
        controller: 'ConditionsCtrl',
        controllerAs: 'conditions',
        resolve: {
          "initialData": ['$q', 'MemberSvc', 'SnomedSvc', function($q, MemberSvc, SnomedSvc) {
            return $q.all({
              member: MemberSvc.getData(10000),
              disorder: SnomedSvc.getData('disorder')
            }).then(function(data) {
              return { member: data.member.data, disorder: data.disorder.data.concepts };
            });

          }]
        }
      })
      .when('/labs', {
        templateUrl: 'views/labs.html',
        controller: 'LabsCtrl',
        controllerAs: 'labs',
        resolve: {
          "initialData": ['$q', 'MemberSvc', 'LoincSvc', function($q, MemberSvc, LoincSvc) {
            return $q.all({
              member: MemberSvc.getData(10000),
              loinc: LoincSvc.getData()
            }).then(function(data) {
              return { member: data.member.data, loinc: data.loinc.data.concepts };
            });

          }]
        }

      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.run(['$rootScope', function($rootScope) {
console.log('app.run');
  $rootScope.$on('$stateChangeStart', function(eventm, toParams, fromState, fromParams) {
console.log('$stateChangeStart');
  });

  $rootScope.$on('$stateChangeSuccess', function(eventm, toParams, fromState, fromParams) {
console.log('$stateChangeSuccess');
  });

}]);

