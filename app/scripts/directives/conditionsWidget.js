'use strict';

angular.module('phrApp') 
  .directive('conditionsWidget', function($http, config) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/conditionsWidget.html',
      controller: controller,
      link: link
    };

    function controller($scope) {
      var url = config.baseUrl + '/getsnomeds?id=diabetes&category=disorder';

      $http({url: url, method: 'GET', cache: true}).then(function(response) {
        $scope.data = response.data.concepts;
      });

      $scope.selectedDisorder = null;
    }

    function link(scope, element, attrs) {
      scope.time = new Date();
      scope.localSearch = function(str, concepts) {
        var matches = [];
        concepts.forEach(function(concept) {
          if (concept.desc.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) {
            matches.push(concept);
          }
        });

        return matches;
      };
    }
  });
