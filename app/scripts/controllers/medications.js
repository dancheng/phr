'use strict';

angular.module('phrApp')
  .controller('MedicationsCtrl', function ($scope, $http, config, initialData) {

    $scope.data = _.chain(initialData.medications).orderBy(['startDate'], ['desc']).value();
console.log('meds', $scope.data);

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
        usg: usg,
        start_date: start_date,
        end_date: end_date
      };

      var data = $.param({
        json: JSON.stringify(entry)
      });

      $http.post("http://alphaphr.com:8080/core/med", data, config).success(function(data, status) {
        initialData.medications.push(entry);
        $scope.data.push(entry);

        console.log('data', data);
      });
    }

  });
