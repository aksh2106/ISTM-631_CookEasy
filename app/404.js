'use strict';

angular.module('cookEasy.404', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/404', {
    templateUrl: '404.html',
    controller: '404Ctrl'
  });
}])

.controller('404Ctrl', ['$scope', '$firebaseArray', '$window', 'CommonProp', function($scope, $firebaseArray, $window, CommonProp){

}])
