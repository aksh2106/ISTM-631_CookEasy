'use strict';

// Declare app level module which depends on views, and core components
angular.module('cookEasy', [
  'ngRoute',
  'cookEasy.search',
  'cookEasy.recipe',
  'cookEasy.recipe',
  'cookEasy.homepage',
  'cookEasy.cart',
  'cookEasy.login',
  'cookEasy.signup',
  'cookEasy.resetPassword',
  'cookEasy.checkout',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/homepage'});
}]);
