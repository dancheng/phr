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
      var weights = _.chain(measurements).filter({'type': 'weight'}).orderBy(['date'], ['desc']).value();

      scope.showChart = false;

      _.map(weights, function(x) {
        x.date = moment(x.date).format('YYYY-MM-DD');
        x.value = +x.value;
        if (x.uom === 'kg') {
          x.value *= 2.20462;
        }
        x.value = Math.round(x.value * 10) / 10;
      });

      scope.current = weights[0];

      var chart = c3.generate({
        bindto: element.find('.chart').get(0),
        data: {
          x: 'x',
          columns: [ 
            _.concat(['x'], _.map(weights, 'date')), 
            _.concat(['Weight'], _.map(weights, 'value')),
          ]
        },
        axis : {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m'
            }
          },
          y: {
            label: {
              text: 'lbs',
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
