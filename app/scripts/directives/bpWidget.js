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
      var bps = _.chain(measurements).filter({'type': 'bp'}).orderBy(['date'], ['desc']).value();

      scope.showChart = false;

      _.map(bps, function(x) {
        x.date = moment(x.date).format('YYYY-MM-DD');
        x.systolic = 0;
        x.diastolic = 0;
        if (x.value) {
          var v = x.value.split('/');
          x.systolic = v[0];
          x.diastolic = v[1];
        }
      });

      scope.current = bps[0];

      var chart = c3.generate({
        bindto: element.find('.chart').get(0),
        data: {
          x: 'x',
          columns: [
            _.concat(['x'], _.map(bps, 'date')),
            _.concat(['Systolic'], _.map(bps, 'systolic')),
            _.concat(['Diastolic'], _.map(bps, 'diastolic'))
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
              text: 'mm Hg',
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
