'use strict';

angular.module('phrApp') 
  .directive('hrWidget', function($http) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/hrWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
     var measurements = scope.data.measurements;
      scope.hr = _.find(measurements, {'type': 'heartRate'})

      // get latest bp by date
      scope.hr = _.chain(measurements).filter({'type': 'heartRate'}).orderBy(['date'], ['desc']).first(1).value();

      scope.save = function() {
        var config = {
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        };

        var hr = element.find('#hr-rate').val();
        var uom = "bpm";
        var date = element.find('#hr-date').val();
        var dateTime = new Date(date);

        var memberId = scope.data.demographic.id;
        var data = $.param({
          id: memberId,
          json: JSON.stringify({
            rowID: 0,
            type: "heartRate",
            value: hr,
            uom: uom,
            date: dateTime.toISOString()
          })
        });

        $http.post("http://alphaphr.com:8080/core/mea", data, config).success(function(data, status) {
          scope.hr = { value: hr, uom: uom };

          element.find('#hrModal').modal('hide');
          console.log('data', data);
        });
      }
    }
  });
