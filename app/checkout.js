'use strict';

angular.module('cookEasy.checkout', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/checkout', {
        templateUrl: 'checkout.html',
        controller: 'checkoutCtrl'
    });
}])

.controller('checkoutCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
    const checkoutRef = firebase.database().ref().child('/ShoppingCart/Cart1');
    checkoutRef.on('value', function(snapshot) {
        $scope.user_id = snapshot.val().user_id;
        $scope.ingredients = snapshot.val().Ingredients;
        $scope.totalQuantity = 0;
        snapshot.forEach(function(snap1) {
            snap1.forEach(function(snap2) {
                $scope.totalQuantity += snap2.val().quantity;
            });
        });
        console.log($scope.totalQuantity);
        $scope.totalCost = 0;
        snapshot.forEach(function(snap1) {
            snap1.forEach(function(snap2) {
                $scope.totalCost += snap2.val().cost;
            });
        });
    });
}])