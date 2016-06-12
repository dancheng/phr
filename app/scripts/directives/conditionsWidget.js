'use strict';

angular.module('phrApp') 
  .directive('conditionsWidget', function($http, config) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/conditionsWidget.html',
      link: link
    };

    function link(scope, element, attrs) {
      var conditions = scope.data.diagnoses;

      _.map(conditions, function(x) { 
        x.startDate = (x.startDate) ? moment(x.startDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
        x.endDate = (x.endDate) ? moment(x.endDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
      });

console.log('conditions', conditions)
            //_.concat(['x'], _.map(conditions, 'startDate')),

      var chart = c3.generate({
        bindto: '#conditionsChart',
        data: {
//type: 'bar',
        x: 'x',
        columns: [
            ['x', '2010-01-01', '2010-02-01'],
            ['data1', 30, 30],
            ['data2', 40, 40]
        ]
    },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m' // format string is also available for timeseries data
            }
          },
          //rotated: true
        },
        transition: {
          duration: 1000
        }
      });
    }
  });
