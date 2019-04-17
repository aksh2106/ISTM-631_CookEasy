'use strict';

/* initialize 404 page module in angular */
angular.module('cookEasy.404', ['ngRoute', 'firebase'])

/* routes for 404.html page */
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/404', {
    templateUrl: '404.html',
    controller: '404Ctrl'
  });
}])

/* controller logic, not required */
.controller('404Ctrl', ['$scope', '$firebaseArray', '$window', 'CommonProp', function($scope, $firebaseArray, $window, CommonProp){

}])
