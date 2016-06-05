'use strict';

angular.module('phrApp')
  .controller('ConditionsCtrl', function ($scope, $http, SnomedSvc, MemberSvc, initialData) {
    $scope.localData = initialData.disorder;

    $scope.selectedCondition = null;

    $scope.localSearch = function(str, concepts) {
      var matches = [];
      concepts.forEach(function(concept) {
        if (concept.desc.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) {
          matches.push(concept);
        }
      });

      return matches;
    };

    $scope.data = _.orderBy(initialData.member.diagnoses, ['startDate'], ['desc']);

    var formatData = function() {
      _.forEach($scope.data, function(x) {
        var cond = _.find($scope.localData, {code: x.code});
        x.desc = cond.desc;
        x.startDate = (x.startDate) ? moment(x.startDate).format('YYYY-MM-DD') : '';
        x.endDate = (x.endDate) ? moment(x.endDate).format('YYYY-MM-DD') : '';
      });
    }

    formatData();

    $scope.showEditDelete = false;

    $scope.editDelete = function(item) {
      console.log('edit-delete', item);
      angular.element('#conditionsModal').modal('show');
      angular.element('#_value').val(item.cond.desc);
      $scope.status = item.cond.status;
      $scope.startDate = item.cond.startDate;
      $scope.endDate = item.cond.endDate;
      //angular.element('#endDate').val(endDate);
console.log('item.cond', $scope.endDate);

      $scope.selectedCondition = { originalObject: item.cond };
      $scope.showEditDelete = true;
    }

    $scope.add = function() {
      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

      var cond = $scope.selectedCondition.originalObject;
      var startDate = new Date($scope.startDate);
      var endDate = new Date($scope.endDate);
      var entry = {
        rowID: 0,
        code: cond.code,
        type: cond.codetype,
        status: $scope.status,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };

      var data = $.param({
        id: initialData.member.demographic.id,
        json: JSON.stringify(entry)
      });

      $scope.showEditDelete = true;

      $http.post("http://alphaphr.com:8080/core/diagnosis", data, config).success(function(data, status) {
/*
        initialData.member.diagnoses.push(entry);
        $scope.data.push(entry);
*/
        MemberSvc.getData(initialData.member.demographic.id).success(function(data, status) {
console.log('reload', data);
          $scope.data = _.orderBy(data.diagnoses, ['startDate'], ['desc'])
          formatData();
        });

        angular.element('#conditionsModal').modal('hide');

        console.log('data', data);
      });
    }

    $scope.edit = function() {
      console.log('edit');
      $scope.showEditDelete = false;
    }

    $scope.delete = function() {
      console.log('delete');
      $scope.showEditDelete = false;
    }

    $scope.cancel = function() {
      console.log('cancel');
      $scope.showEditDelete = false;
      angular.element('#conditionsModal').modal('hide');
    }

  });

