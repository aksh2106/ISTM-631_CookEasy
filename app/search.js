'use strict';

angular.module('cookEasy.search', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/search', {
    templateUrl: 'search.html',
    controller: 'searchCtrl'
  });
}])

.service('CommonProp', function(){
      var searchTextService = "";
      var displayName = "";
      var email = "";
      var selectedItems = [];
      return {
        setSearchText: function(value){
          searchTextService = value;
        },
        setDisplayName: function(value){
          displayName = value;
        },
        setEmail: function(value)
        {
          email = value;
        },
        getSearchText: function(){
          return searchTextService;
        },
        setSelectedItems: function(value){
          selectedItems = value;
        },
        getSelectedItems: function() {
          return selectedItems;
        },
        getDisplayName: function() {
          return displayName;
        },
        getEmail: function() {
          return email;
        }
      }
})

.controller('searchCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function($scope, $firebaseArray, $location, CommonProp){
    $scope.$watch('searchText', function(){
      CommonProp.setSearchText($scope.searchText);
    });

}])
