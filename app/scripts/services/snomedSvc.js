'use strict';

angular.module('phrApp').factory('SnomedSvc', function($http, config) {
  var service = {
    getData: getData
  };

  function getData(category) {
    var url = config.baseUrl + '/getsnomeds?category=' + category;
    return $http({url: url, method: 'GET', cache: true});
  }

  return service;
});
