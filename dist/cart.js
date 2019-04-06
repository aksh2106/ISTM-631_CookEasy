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
    var setCartRef = firebase.database().ref().child('PricePerUnitTable');

    var updates = {};
    updates['user_id'] = 1;
    var totalQuantity = 0;
    var totalCost = 0;
    firebase.database().ref().child('/ShoppingCart/Cart1').set(updates);
    angular.forEach($scope.items, function(element){
        setCartRef.on('value', function(snapshot) {
            snapshot.forEach(function(snap) {  
                if(snap.val().ingredientName == element){
                    var cost = snap.val().defaultQuantity * snap.val().pricePerUnit;
                    totalQuantity += snap.val().defaultQuantity;
                    totalCost += cost;
                    updates['totalQuantity'] = totalQuantity;
                    updates['totalCost'] = totalCost;
                    firebase.database().ref().child('/ShoppingCart/Cart1').update(updates);
                    var ingredientInfo = {}
                    ingredientInfo[snap.val().ingredientName] = {
                        pricePerUnit: snap.val().pricePerUnit,
                        name: snap.val().ingredientName,
                        quantity: snap.val().defaultQuantity,
                        cost: cost
                    };

                    //updates['Ingredients'].push(ingredientInfo);
                    //console.log(updates);
                    firebase.database().ref().child('/ShoppingCart/Cart1/Ingredients').update(ingredientInfo);

                }
            });
        });
    });

    var fetchcartRef = firebase.database().ref().child('/ShoppingCart/Cart1');
    $scope.cartInfo = $firebaseArray(fetchcartRef);
    
    fetchcartRef.on('value', function(snapshot) {
        $scope.user_id = snapshot.val().user_id;
        $scope.ingredients = snapshot.val().Ingredients;
        $scope.totalQuantity = snapshot.val().totalQuantity;
        $scope.totalCost = snapshot.val().totalCost;
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
                console.log(updates);
                firebase.database().ref().child('/ShoppingCart/Cart1').update(updates);

                var ingredientInfo = {};
                ingredientInfo[ingredient.name] = {
                    pricePerUnit: ingredient.pricePerUnit,
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    cost: ingredient.cost
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
