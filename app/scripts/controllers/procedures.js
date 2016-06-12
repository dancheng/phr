'use strict';

angular.module('phrApp')
  .controller('ProceduresCtrl', function ($scope, $http, config, MemberSvc, initialData) {
    $scope.localData = initialData.snomed;

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

    $scope.data = _.orderBy(initialData.member.procedures, ['serviceDate'], ['desc']);

    var formatData = function() {
      _.forEach($scope.data, function(x) {
        var proc = _.find($scope.localData, {code: x.code + ""});
        x.desc = "";
        if (proc) {
          x.desc = proc.desc;
        }
        x.serviceDate = (x.serviceDate) ? moment(x.serviceDate).format('YYYY-MM-DD') : '';
      });
    };

    formatData();

    $scope.add = function() {
      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

      var proc = $scope.selectedProcedure.originalObject;
      var serviceDate = ($scope.serviceDate) ? new Date($scope.serviceDate).toISOString() : "";
      var entry = {
        rowID: 0,
        code: proc.code,
        type: proc.codetype,
        serviceDate: serviceDate
      };

      var data = $.param({
        id: initialData.member.demographic.id,
        json: JSON.stringify(entry)
      });

      $http.post("http://alphaphr.com:8080/core/proc", data, config).success(function(data, status) {
        MemberSvc.getData(initialData.member.demographic.id).success(function(data, status) {
          $scope.data = _.orderBy(data.procedures, ['serviceDate'], ['desc'])
          formatData();
        });

        angular.element('#proceduresModal').modal('hide');
      });
    }
  });
