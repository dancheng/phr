'use strict';

angular.module('phrApp')
  .controller('WeightCtrl', function ($scope, $http, config, initialData) {

    $scope.data = _.chain(initialData.measurements).filter({type: 'weight'}).orderBy(['date'], ['desc']).value();

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
        type: "weight",
        value: weight+"",
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
        $scope.weight = { value: weight, uom: uom };

        console.log('data', data);
      });
    }

  });
