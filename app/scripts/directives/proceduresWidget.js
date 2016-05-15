'use strict';

angular.module('phrApp') 
  .directive('proceduresWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/proceduresWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
