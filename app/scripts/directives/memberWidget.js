'use strict';

angular.module('phrApp') 
  .directive('memberWidget', function() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: 'templates/memberWidget.html',
      link: link
    };

    function link(scope, element, attrs) {
      var demo = scope.data.demographic;
      var measurements = scope.data.measurements;
      var height = _.chain(measurements).filter({'type': 'height'}).orderBy(['date'], ['desc']).first(1).value();

      demo.gender = (demo.gender === 'M') ? 'Male' : 'Female';

      var today = moment();
      var dob = moment(demo.dob);
      demo.dob = dob.format('YYYY-MM-DD');

      var age = moment.duration(today.diff(dob));
      demo.age = parseInt(age.asYears());

      demo.height = height.value + ' ' + height.uom;

      scope.demo = demo;
    }
  });
