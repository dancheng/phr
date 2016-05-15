'use strict';

angular.module('phrApp') 
  .directive('hrWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/hrWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
