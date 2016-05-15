'use strict';

angular.module('phrApp') 
  .directive('immunizationsWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/immunizationsWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
