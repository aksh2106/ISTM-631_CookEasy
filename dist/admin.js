'use strict';

angular.module('cookEasy.admin', ['ngRoute', 'firebase', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/admin', {
    templateUrl: 'admin.html',
    controller: 'adminCtrl'
  });
}])

.controller('adminCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){

  $scope.fetchUsers = function() {
    $scope.showRecipes = false;
    $scope.showPPUnit = false;
    $scope.showSubscribers = false;

    var users = firebase.database().ref().child('/UserDetails');
    $scope.users = $firebaseArray(users);
    $scope.showUsers = true;

  };

  $scope.fetchRecipes = function() {

    $scope.showPPUnit = false;
    $scope.showSubscribers = false;
    $scope.showUsers = false;

    var recipes = firebase.database().ref().child('/RecipeTable');
    $scope.recipes = $firebaseArray(recipes);
    $scope.showRecipes = true;

  };

  $scope.fetchSubscribers = function() {
    $scope.showPPUnit = false;
    $scope.showRecipes = false;
    $scope.showUsers = false;

    var subscribers = firebase.database().ref().child('/Subscribers');
    $scope.subscribers = $firebaseArray(subscribers);

    $scope.showSubscribers = true;
  };

  $scope.fetchPricePerUnit = function() {
    $scope.showSubscribers = false;
    $scope.showRecipes = false;
    $scope.showUsers = false;
    
    var pricePerUnits = firebase.database().ref().child('/PricePerUnitTable');
    $scope.pricePerUnits = $firebaseArray(pricePerUnits);
    $scope.showPPUnit = true;

  };

}]);
