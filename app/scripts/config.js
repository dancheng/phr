(function() {
  'use strict';

  var app = angular.module('phrApp');

  var config = {
    'baseUrl': 'http://alphaphr.com:8080/core'
  };

  app.value('config', config);
})();
