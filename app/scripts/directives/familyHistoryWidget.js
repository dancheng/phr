'use strict';

angular.module('phrApp') 
  .directive('familyHistoryWidget', function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/familyHistoryWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
    }
  });
