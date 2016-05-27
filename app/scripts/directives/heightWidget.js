'use strict';

angular.module('phrApp') 
  .directive('heightWidget', function() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/heightWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
      var measurements = scope.data.measurements;
      scope.height = _.find(measurements, {'type': 'height'})
    }
  });
