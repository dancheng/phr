'use strict';

angular.module('phrApp')
  .controller('BpCtrl', function ($scope, $http, config, initialData) {

    $scope.data = _.chain(initialData.measurements).filter({type: 'bp'}).orderBy(['date'], ['desc']).value();
console.log('$scope.data', $scope.data);

    $scope.save = function() {

      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

      var systolic = angular.element('.systolic').val();
      var diastolic = angular.element('.diastolic').val();
      var value = systolic + '/' + diastolic;
      var uom = angular.element('select').val();
      var memberId = initialData.demographic.id;
      var entry = {
        rowID: 0,
        type: "bp",
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
        $scope.bp = { value: value, uom: uom };

        console.log('data', data);
      });
    }

  });
