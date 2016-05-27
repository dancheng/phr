'use strict';

angular.module('phrApp').factory('MemberSvc', function($http) {

  var service = {
    getData: getData
  };


  function getData(id) {
    return $http.get("http://alphaphr.com:8080/core/member/" + id);
  }

  return service;
});
