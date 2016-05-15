'use strict';

angular.module('phrApp') 
  .directive('bpWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/bpWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
