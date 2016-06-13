'use strict';

angular.module('phrApp') 
  .directive('bmiWidget', function($http) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/bmiWidget.html',
      link: link
    };

    function link(scope, element, attrs) {
      var measurements = scope.data.measurements;
      var weights = _.chain(measurements).filter({'type': 'weight'}).orderBy(['date'], ['desc']).value();
      var heights = _.chain(measurements).filter({'type': 'height'}).orderBy(['date'], ['desc']).value();

      scope.showChart = false;

      // use latest height
      var height = heights[0];
      if (height.uom === 'in') {
        height.value *= .025;
      } else if (height.uom === 'cm') {
        height.value *= .01;
      }

      _.map(weights, function(x) {
        x.date = moment(x.date).format('YYYY-MM-DD');
        x.weight = +x.value;
        if (x.uom === 'lbs') {
          x.weight *= .453592;
        }

        // weight / height^2
        x.bmi = Math.round(x.weight / Math.pow(height.value, 2) * 10) / 10 ;
      });

      scope.current = weights[0];

      var chart = c3.generate({
        bindto: element.find('.chart').get(0),
        data: {
          x: 'x',
          columns: [ 
            _.concat(['x'], _.map(weights, 'date')), 
            _.concat(['BMI'], _.map(weights, 'bmi')) 
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
              text: 'BMI Index',
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
