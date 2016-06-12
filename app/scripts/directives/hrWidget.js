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
      var hrs = _.chain(measurements).filter({'type': 'hr'}).orderBy(['date'], ['desc']).value();

      // get latest heart rate by date
      scope.hr = hrs[0];

      _.map(hrs, function(x) {
        x.date = moment(x.date).format('YYYY-MM-DD');
        x.value = +x.value;
      });

     var chart = c3.generate({
        bindto: '#hrChart',
        data: {
          x: 'x',
          columns: [ 
            _.concat(['x'], _.map(hrs, 'date')),
            _.concat(['Heart Rate'], _.map(hrs, 'value'))
          ]
        },
        axis : {
          x: {
            type: 'timeseries',
            tick: {
              //format: function (x) { return x.getFullYear(); }
              format: '%Y-%m' // format string is also available for timeseries data
            }
          },
          y: {
            label: {
              text: 'bpm',
              position: 'outer-middle'
            }
          }
        },
        zoom: {
          enabled: false
        }
      });
    }
  });
