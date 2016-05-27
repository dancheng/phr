'use strict';

angular.module('phrApp') 
  .directive('hrWidget', function() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/hrWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
     var measurements = scope.data.measurements;
      scope.hr = _.find(measurements, {'type': 'heartRate'})
    }
  });
