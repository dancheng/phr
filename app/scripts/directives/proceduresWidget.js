'use strict';

angular.module('phrApp') 
  .directive('proceduresWidget', function($http, config) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/proceduresWidget.html',
      controller: controller,
      link: link
    };

    function controller($scope) {
      var url = config.baseUrl + '/getsnomeds?category=procedure';

      $http({url: url, method: 'GET', cache: true}).then(function(response) {
        $scope.data = response.data.concepts;
      });

      $scope.selectedProcedure = null;
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

      scope.$watch('date', function(newValue, oldValue) {
      });
    }

  });
