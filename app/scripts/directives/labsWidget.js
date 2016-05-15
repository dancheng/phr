'use strict';

angular.module('phrApp') 
  .directive('labsWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/labsWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
