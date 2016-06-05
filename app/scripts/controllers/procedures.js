'use strict';

angular.module('phrApp')
  .controller('ProceduresCtrl', function ($scope, $http, initialData) {
    $scope.localData = initialData.procedure;

    $scope.selectedProcedure = null;

    $scope.localSearch = function(str, concepts) {
      var matches = [];
      concepts.forEach(function(concept) {
        if (concept.desc.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) {
          matches.push(concept);
        }
      });

      return matches;
    };

    $scope.data = _.chain(initialData.member.procedures).orderBy(['startDate'], ['desc']).value();
console.log('proc', $scope.data);


    $scope.save = function() {
      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

console.log('selected', $scope.selectedProcedure);
      var proc = $scope.selectedProcedure.originalObject;
      var serviceDate = new Date($scope.serviceDate);
      var memberId = initialData.demographic.id;
      var entry = {
        rowID: 0,
        memberId: memberId,
        code: proc.code,
        type: proc.codetype,
        service_date: serviceDate.toISOString()
      };

      var data = $.param({
        id: memberId,
        json: JSON.stringify(entry)
      });

console.log('entry', entry);
      $http.post("http://alphaphr.com:8080/core/proc", data, config).success(function(data, status) {
        initialData.procedures.push(entry);
        $scope.data.push(entry);

        console.log('data', data);
      });
    }

  });
