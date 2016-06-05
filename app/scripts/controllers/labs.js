'use strict';

angular.module('phrApp')
  .controller('LabsCtrl', function ($scope, $http, config, initialData) {

console.log('cond', initialData);
    $scope.data = _.chain(initialData.labs).orderBy(['serviceDate'], ['desc']).value();

    $scope.save = function() {

      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

      var weight = angular.element('input').val();
      var uom = angular.element('select').val();
      var memberId = initialData.demographic.id;
      var entry = {
        rowID: 0,
        memberId: memberId,
        code: code,
        type: type,
        value: value,
        uom: uom,
        service_date: start_date,
        repprt_date: end_date
      };

      var data = $.param({
        json: JSON.stringify(entry)
      });

      $http.post("http://alphaphr.com:8080/core/lab", data, config).success(function(data, status) {
        initialData.medications.push(entry);
        $scope.data.push(entry);

        console.log('data', data);
      });
    }

  });
