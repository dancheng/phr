'use strict';

angular.module('phrApp') 
  .directive('conditionsWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/conditionsWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
