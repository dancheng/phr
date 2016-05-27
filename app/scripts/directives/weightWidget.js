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
      scope.weight = _.find(measurements, {'type': 'weight'})

      scope.save = function() {
        var weight = element.find('input').val();
        var memberId = scope.data.demographic.id;
        var data = $.param({
          json: JSON.stringify({
            rowID: null,
            memberID: memberId,
            type: 'weight',
            value: weight,
            uom: 'lbs',
            date: null
          })
        });

        $http.post("http://alphaphr.com:8080/core/mea?id=" + memberId, data).success(function(data, status) {
          element.find('#weightModal').modal('hide');
          console.log('save', weight);
        });
      }
    }
  });
