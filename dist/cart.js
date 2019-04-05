'use strict';

angular.module('cookEasy.cart', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/cart', {
        templateUrl: 'cart.html',
        controller: 'cartCtrl'
    });
}])

.controller('cartCtrl', ['$scope', '$firebaseArray', 'cartService', 'CommonProp', function($scope, $firebaseArray, cartService, CommonProp){

    $scope.items = CommonProp.getSelectedItems();

    /* Get ingredients table from database. Check each element against the selected list.
    If present add it to a new list along with price ,qty */

    var ref1 = firebase.database().ref().child('PricePerUnitTable');
    $scope.itemPrices = $firebaseArray(ref1);

    $scope.finalList = [];
    $scope.getItems = function(){

        angular.forEach($scope.items, function(element){
            angular.forEach($scope.itemPrices, function(item){
                if(item.ingredientName==element){
                    $scope.finalList.push(item);
                }
            });
        });
        console.log($scope.finalList);

        $scope.cartItems = [];
        angular.forEach($scope.finalList, function(element){

            $scope.ingredientInfo = {
                pricePerUnit: element.pricePerUnit,
                ingredientName: element.ingredientName,
                defaultQuantity: element.defaultQuantity,
                cost: element.defaultQuantity * element.pricePerUnit
            };
            $scope.cartItems.push($scope.ingredientInfo);
        });
        console.log($scope.cartItems);

        $scope.totalQuantity = 0;
        $scope.totalCost = 0;
        angular.forEach($scope.cartItems, function(element){
            
            $scope.totalQuantity = $scope.totalQuantity + element.defaultQuantity;
            $scope.totalCost = $scope.totalQuantity + element.cost;
            var updates = {};

            var ingredientInfo = {}
            ingredientInfo[element.ingredientName] = {
                pricePerUnit: element.pricePerUnit,
                name: element.ingredientName,
                quantity: element.defaultQuantity,
                cost: element.cost
            };

            updates['user_id'] = 1;
            updates['Ingredients'] = ingredientInfo;

            // replace Cart1 with user_id to identify each cart to a user
            firebase.database().ref().child('/ShoppingCart/Cart1').set(updates);
        });

        const cartRef = firebase.database().ref().child('/ShoppingCart/Cart1');
        $scope.cart = $firebaseArray(cartRef);
        cartRef.on('value', function(snapshot) {
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
    };
}])
