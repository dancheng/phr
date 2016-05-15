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
    }
  });
