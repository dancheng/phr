'use strict';

angular.module('phrApp') 
  .directive('alertsWidget', function($http) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/alertsWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
      scope.count = scope.data.length;
    }
  });
