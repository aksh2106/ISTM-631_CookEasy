'use strict';

/* initialize checkout module in angular */
angular.module('cookEasy.checkout', ['ngRoute', 'firebase'])

/* routes for checkout.html page */
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/checkout', {
        templateUrl: 'checkout.html',
        controller: 'checkoutCtrl'
    });
}])

/* controller logic for retreiving cart summary at checkout and allow order placing functionality */
.controller('checkoutCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
    /* fetch cart items */
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
        $scope.totalCost = 0;
        snapshot.forEach(function(snap1) {
            snap1.forEach(function(snap2) {
                $scope.totalCost += snap2.val().cost;
            });
        });
    });

    /* place order functionality */
    $scope.placeOrder = function() {
        var elements = document.getElementById("paymentDetailsForm").elements;
        for (var i = 0; i < elements.length; i++) {
            console.log(elements[i]);
        }
    }
}])