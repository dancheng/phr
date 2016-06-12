'use strict';

angular.module('phrApp').factory('RxNormSvc', function($http, config) {
  var service = {
    getData: getData
  };

  function getData(category) {
    var url = config.baseUrl + '/getrxn';
    return $http({url: url, method: 'GET', cache: true});
  }

  return service;
});
