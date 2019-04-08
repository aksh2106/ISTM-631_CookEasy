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
  'cookEasy.orderConfirmation',
  'cookEasy.about',
  'cookEasy.contact',
  'cookEasy.404'
])

.directive('script', function() {
  return {
    restrict: 'E',
    scope: false,
    link: function(scope, elem, attr) {
      if (attr.type === 'text/javascript') {
        var code = elem.text();
        var f = new Function(code);
        f();
      }
    }
  };
})

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/404'});
}]);
