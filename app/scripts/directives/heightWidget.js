'use strict';

angular.module('phrApp') 
  .directive('heightWidget', function($http) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/heightWidget.html',
      link: link
    };


    function link(scope, element, attrs) {
      var measurements = scope.data.measurements;

      // get latest height by date
      scope.height = _.chain(measurements).filter({'type': 'height'}).orderBy(['date'], ['desc']).first(1).value();

      scope.save = function() {
        var config = {
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        };

        var height = element.find('input').val();
        var memberId = scope.data.demographic.id;
        var data = $.param({
          id: memberId,
          json: JSON.stringify({
            rowID: 0,
            type: "height",
            value: height+"",
            uom: "cm",
            date: (new Date).toISOString()
          })
        });

        $http.post("http://alphaphr.com:8080/core/mea", data, config).success(function(data, status) {
          scope.height = { value: height, uom: "lbs" };

          element.find('#heightModal').modal('hide');
          console.log('data', data);
        });
      }
    }
  });
