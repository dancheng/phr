'use strict';

angular.module('phrApp') 
  .directive('allergiesWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/allergiesWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
