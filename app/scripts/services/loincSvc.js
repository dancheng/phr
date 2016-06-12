'use strict';

angular.module('phrApp').factory('LoincSvc', function($http, config) {
  var service = {
    getData: getData
  };

  function getData(category) {
    var url = config.baseUrl + '/getloinc';
    return $http({url: url, method: 'GET', cache: true});
  }

  return service;
});
