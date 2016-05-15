'use strict';

angular.module('phrApp') 
  .directive('weightWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/weightWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
