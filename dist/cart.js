'use strict';

/* initialize cart module in angular */
angular.module('cookEasy.cart', ['ngRoute', 'firebase'])

/* routes for cart.html page */
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/cart', {
        templateUrl: 'cart.html',
        controller: 'cartCtrl'
    });
}])

/* controller logic for retreiving ingredients to cart, saving changes made to cart */
.controller('cartCtrl', ['$scope', '$firebaseArray', 'cartService', 'CommonProp', function($scope, $firebaseArray, cartService, CommonProp){

    /* fetch cart items from Firebase Realtime Database */
    var fetchcartRef = firebase.database().ref().child('/ShoppingCart/Cart1');
    $scope.cartInfo = $firebaseArray(fetchcartRef);
    
    fetchcartRef.on('value', function(snapshot) {
        $scope.user_id = snapshot.val().user_id;
        $scope.ingredients = snapshot.val().Ingredients;
        $scope.totalQuantity = snapshot.val().totalQuantity;
        $scope.totalCost = snapshot.val().totalCost;
        $scope.unit = snapshot.val().unit;
    });

    /* update quantity for an ingredient and save changes to database */
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

    /* empty cart */
    $scope.emptyCart = function() {
        firebase.database().ref().child('/ShoppingCart/Cart1').remove();
        location.reload();
    };

    /* delete a particular ingredient and save changes to database */
    $scope.deleteIngredient = function(ingredient) {
        firebase.database().ref().child('/ShoppingCart/Cart1/Ingredients/'+ingredient.name).remove();

        $scope.totalQuantity = $scope.totalQuantity - ingredient.quantity;
        $scope.totalCost = $scope.totalCost - ingredient.cost;

        var updates = {};
        updates['totalQuantity'] = $scope.totalQuantity;
        updates['totalCost'] = $scope.totalCost;
        firebase.database().ref().child('/ShoppingCart/Cart1').update(updates);
    };
}])
