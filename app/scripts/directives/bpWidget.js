'use strict';

angular.module('phrApp') 
  .directive('bpWidget', function() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/bpWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
     var measurements = scope.data.measurements;
      scope.bp = _.find(measurements, {'type': 'bp'})
    }
  });
