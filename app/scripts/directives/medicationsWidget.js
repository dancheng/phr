'use strict';

angular.module('phrApp') 
  .directive('medicationsWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/medicationsWidget.html',
      link: link
    };

    function link(scope, element, attrs) {
      scope.time = new Date();

      scope.$watch('startDate', function(newValue, oldValue) {
        //console.log('scope.startDate', newValue);
      });

      scope.$watch('endDate', function(newValue, oldValue) {
        //console.log('scope.endDate', newValue);
      });

    }
  });
