'use strict';

angular.module('phrApp') 
  .directive('pastConditionsWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/pastConditionsWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
