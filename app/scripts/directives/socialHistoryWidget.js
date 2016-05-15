'use strict';

angular.module('phrApp') 
  .directive('socialHistoryWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/socialHistoryWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
