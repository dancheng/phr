'use strict';

angular.module('phrApp').factory('AlertSvc', function($http) {

  var service = {
    getData: getData
  };


  function getData(id) {
    return $http.get("http://alphaphr.com:8080/core/alert/" + id);
  }

  return service;
});
