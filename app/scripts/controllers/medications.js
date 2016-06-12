'use strict';

angular.module('phrApp')
  .controller('MedicationsCtrl', function ($scope, $http, config, MemberSvc, initialData) {
    $scope.localData = initialData.rxnorm;

    $scope.selectedMedication = null;

/*
    $scope.remoteUrlRequestFn = function(str) {
      return { id: str };
    }

    $scope.localSearch = function(str, concepts) {
      var matches = [];

      concepts.forEach(function(concept) {
        if (concept.desc.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) {
          matches.push(concept);
        }
      });

      return matches;
    };
*/

    $scope.data = _.orderBy(initialData.member.medications, ['endDate'], ['desc']);

    var formatData = function() {
      _.forEach($scope.data, function(x) {
        var med = _.find($scope.localData, {code: x.code});
        x.desc = med.desc;
        x.startDate = (x.startDate) ? moment(x.startDate).format('YYYY-MM-DD') : '';
        x.endDate = (x.endDate) ? moment(x.endDate).format('YYYY-MM-DD') : '';
      });
    };

    formatData();

    $scope.add = function() {
      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

      var med = $scope.selectedMedication.originalObject;
      var startDate = new Date($scope.startDate).toISOString();
      var endDate = ($scope.endDate) ? new Date($scope.endDate).toISOString() : "";
      var entry = {
        rowID: 0,
        code: med.code,
        type: med.codetype,
        usage: $scope.usage,
        startDate: startDate,
        endDate: endDate
      };

      var data = $.param({
        id: initialData.member.demographic.id,
        json: JSON.stringify(entry)
      });

      $http.post("http://alphaphr.com:8080/core/med", data, config).success(function(data, status) {
        MemberSvc.getData(initialData.member.demographic.id).success(function(data, status) {
          $scope.data = _.orderBy(data.medications, ['endDate'], ['desc'])
          formatData();
        });

        angular.element('#medicationsModal').modal('hide');
      });
    }
  });
