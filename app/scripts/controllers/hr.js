'use strict';

angular.module('phrApp')
  .controller('HrCtrl', function ($scope, $http, config, initialData) {

    $scope.data = _.chain(initialData.measurements).filter({type: 'hr'}).orderBy(['date'], ['desc']).value();
console.log('$scope.data!', $scope.data);

    $scope.save = function() {

      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

      var value = angular.element('input').val();
      var uom = angular.element('select').val();
      var memberId = initialData.demographic.id;
      var entry = {
        rowID: 0,
        type: "hr",
        value: value + "",
        uom: uom,
        date: (new Date).toISOString()
      };

      initialData.measurements.push(entry);
      $scope.data.push(entry);

      var data = $.param({
        id: memberId,
        json: JSON.stringify(entry)
      });

      $http.post("http://alphaphr.com:8080/core/mea", data, config).success(function(data, status) {
        $scope.hr = { value: value, uom: uom };

        console.log('data', data);
      });
    }

  });
