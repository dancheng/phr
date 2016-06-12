'use strict';

angular.module('phrApp')
  .controller('LabsCtrl', function ($scope, $http, config, MemberSvc, initialData) {
    $scope.localData = initialData.loinc;

    $scope.selectedLab = null;

    $scope.localSearch = function(str, concepts) {
      var matches = [];

      concepts.forEach(function(concept) {
        if (concept.desc.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) {
          matches.push(concept);
        }
      });

      return matches;
    };

    $scope.data = _.orderBy(initialData.member.labs, ['serviceDate'], ['desc']);

    var formatData = function() {
      _.forEach($scope.data, function(x) {
        var lab = _.find($scope.localData, {code: x.code});
        if (lab) {
          x.desc = lab.desc;
        }
        x.serviceDate = (x.serviceDate) ? moment(x.serviceDate).format('YYYY-MM-DD') : '';
        x.reportDate = (x.reportDate) ? moment(x.reportDate).format('YYYY-MM-DD') : '';
      });
    };

    formatData();

    $scope.add = function() {
      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

      var lab = $scope.selectedLab.originalObject;
      var serviceDate = new Date($scope.serviceDate).toISOString();
      var reportDate = ($scope.reportDate) ? new Date($scope.reportDate).toISOString() : "";
      var entry = {
        rowID: 0,
        code: lab.code,
        type: lab.codetype,
        value: $scope.value,
        uom: $scope.uom,
        service_date: serviceDate,
        report_date: reportDate
      };

      var data = $.param({
        id: initialData.member.demographic.id,
        json: JSON.stringify(entry)
      });

      $http.post("http://alphaphr.com:8080/core/lab", data, config).success(function(data, status) {
        MemberSvc.getData(initialData.member.demographic.id).success(function(data, status) {
          $scope.data = _.orderBy(data.labs, ['serviceDate'], ['desc'])
          formatData();
        });

        angular.element('#labsModal').modal('hide');
      });
    }

  });
