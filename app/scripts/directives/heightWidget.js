'use strict';

angular.module('phrApp') 
  .directive('heightWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/heightWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
