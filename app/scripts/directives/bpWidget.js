'use strict';

angular.module('phrApp') 
  .directive('bpWidget', function($http) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/bpWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
      var measurements = scope.data.measurements;

      // get latest bp by date
      scope.bp = _.chain(measurements).filter({'type': 'bp'}).orderBy(['date'], ['desc']).first(1).value();

      scope.save = function() {
        var config = {
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        };

        var systolic = element.find('#bp-systolic').val();
        var diastolic = element.find('#bp-diastolic').val();
        var bp = systolic + "/" + diastolic;
        var uom = "mm Hg";
        var date = element.find('#bp-date').val();
        var dateTime = new Date(date);

        var memberId = scope.data.demographic.id;
        var data = $.param({
          id: memberId,
          json: JSON.stringify({
            rowID: 0,
            type: "bp",
            value: bp,
            uom: uom,
            date: dateTime.toISOString()
          })
        });

        $http.post("http://alphaphr.com:8080/core/mea", data, config).success(function(data, status) {
          scope.bp = { value: bp, uom: uom };

          element.find('#bpModal').modal('hide');
          console.log('data', data);
        });
      }
    }
  });
