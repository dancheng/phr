'use strict';

angular.module('phrApp') 
  .directive('weightWidget', function($http) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/weightWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
      var measurements = scope.data.measurements;

      // get latest weight by date
      scope.weight = _.chain(measurements).filter({'type': 'weight'}).orderBy(['date'], ['desc']).first(1).value();

      scope.save = function() {
        var config = {
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        };

        var weight = element.find('input').val();
        var uom = "lbs";
        var memberId = scope.data.demographic.id;
        var data = $.param({
          id: memberId,
          json: JSON.stringify({
            rowID: 0,
            type: "weight",
            value: weight+"",
            uom: uom,
            date: (new Date).toISOString()
          })
        });

        $http.post("http://alphaphr.com:8080/core/mea", data, config).success(function(data, status) {
          scope.weight = { value: weight, uom: uom };

          element.find('#weightModal').modal('hide');
          console.log('data', data);
        });
      }
    }
  });
