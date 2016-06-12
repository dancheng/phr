'use strict';

angular.module('phrApp')
  .controller('WeightCtrl', function ($scope, $http, config, MemberSvc, initialData) {

    $scope.data = _.chain(initialData.measurements).filter({type: 'weight'}).orderBy(['date'], ['desc']).value();

    var formatData = function() {
      _.forEach($scope.data, function(x) {
        x.date = (x.date) ? moment(x.date).format('YYYY-MM-DD') : '';
      });
    };

    formatData();

    $scope.add = function() {
      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

      var date = ($scope.date) ? new Date($scope.date).toISOString() : "";

      var entry = {
        rowID: 0,
        type: "weight",
        value: $scope.value + "",
        uom: $scope.uom,
        date: date
      };

      var data = $.param({
        id: initialData.demographic.id,
        json: JSON.stringify(entry)
      });

      $http.post("http://alphaphr.com:8080/core/mea", data, config).success(function(data, status) {
        console.log('1data', data);
        MemberSvc.getData(initialData.demographic.id).success(function(data, status) {
          console.log('2data', data);
          $scope.data = _.chain(data.measurements).filter({type: 'weight'}).orderBy(['date'], ['desc']).value();
          formatData();
        });

        angular.element('#weightModal').modal('hide');
      });
    }

  });
