'use strict';

angular.module('cookEasy.cart', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/cart', {
        templateUrl: 'cart.html',
        controller: 'cartCtrl'
    });
}])

.controller('cartCtrl', ['$scope', '$firebaseArray', 'cartService', 'CommonProp', function($scope, $firebaseArray, cartService, CommonProp){

    var fetchcartRef = firebase.database().ref().child('/ShoppingCart/Cart1');
    $scope.cartInfo = $firebaseArray(fetchcartRef);
    
    fetchcartRef.on('value', function(snapshot) {
        $scope.user_id = snapshot.val().user_id;
        $scope.ingredients = snapshot.val().Ingredients;
        $scope.totalQuantity = snapshot.val().totalQuantity;
        $scope.totalCost = snapshot.val().totalCost;
        $scope.unit = snapshot.val().unit;
    });

    $scope.updateQuantity = function(ingredient, num) {
        if (ingredient.quantity + num < 0) {
            $scope.deleteIngredient(ingredient);
        } else {
            if (ingredient.quantity + num >= 0) {
                const oldQuantity = ingredient.quantity;
                const oldCost = ingredient.cost;
                ingredient.quantity += num;
                ingredient.cost = ingredient.quantity * ingredient.pricePerUnit;
                const updateRef = firebase.database().ref().child('/ShoppingCart/Cart1/Ingredients');

                $scope.totalQuantity = $scope.totalQuantity - oldQuantity + ingredient.quantity;
                if (num == 1) {
                    $scope.totalCost = $scope.totalCost - oldCost + ingredient.cost;
                } else {
    
                    $scope.totalCost = $scope.totalCost - oldCost + ingredient.cost;
                }

                var updates = {};
                updates['totalQuantity'] = $scope.totalQuantity;
                updates['totalCost'] = $scope.totalCost;
                firebase.database().ref().child('/ShoppingCart/Cart1').update(updates);

                var ingredientInfo = {};
                ingredientInfo[ingredient.name] = {
                    pricePerUnit: ingredient.pricePerUnit,
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    cost: ingredient.cost,
                    unit: ingredient.unit
                };
                firebase.database().ref().child('/ShoppingCart/Cart1/Ingredients').update(ingredientInfo);
            }
        }
    };

    $scope.emptyCart = function() {
        firebase.database().ref().child('/ShoppingCart/Cart1').remove();
        location.reload();
    };

    $scope.deleteIngredient = function(ingredient) {
        firebase.database().ref().child('/ShoppingCart/Cart1/Ingredients/'+ingredient.name).remove();
    };
}])
