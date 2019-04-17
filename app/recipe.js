'use strict';

angular.module('cookEasy.recipe', ['ngRoute', 'firebase', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/recipe', {
    templateUrl: 'recipe.html',
    controller: 'recipeCtrl'
  });
}])

.controller('recipeCtrl', ['$scope','$firebaseArray', '$sce', 'CommonProp', 'filterFilter', '$window', function($scope,$firebaseArray, $sce, CommonProp, filterFilter, $window){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var tempRef = firebase.database().ref().child('/TempTable');
      $scope.temp = $firebaseArray(tempRef);
      
      tempRef.on('value', function(snapUser) {
        if(snapUser.val().userNameInContext)
          $scope.divText = 'Hello, ' + snapUser.val().userNameInContext + '! ';
        else
          $scope.divText = 'Hello!'
      });
      $scope.show = !$scope.show;
      $scope.$apply();
    } 
  });

  $scope.signOut = function(){
    firebase.auth().signOut().then(function() {
      // Sign out successful.
      firebase.database().ref().child('/TempTable/userIdInContext').remove();
      firebase.database().ref().child('/TempTable/userNameInContext').remove();
    }, function(error) {
      console.log(error);
    });
  }

  $scope.searchText = CommonProp.getSearchText();
  $scope.title = $scope.searchText;

  if ($scope.searchText) {
    //Remove spaces
    $scope.searchText = $scope.searchText.replace(/[\s]/g, '').toLowerCase();

    var updates = {};
    updates['recipeInContext'] = $scope.searchText;
    firebase.database().ref().child('/TempTable').update(updates);
  }

  var tempRef = firebase.database().ref().child('/TempTable');
  $scope.temp = $firebaseArray(tempRef);

  tempRef.on('value', function(snapshot) {
    $scope.searchText = snapshot.val().recipeInContext;

    var ref = firebase.database().ref().child('RecipeTable/'+$scope.searchText+'/Ingredients');
    $scope.ingredients = $firebaseArray(ref);
  
    $scope.createRecipe = function() {
      var name = $scope.ingredient.ingredientName;
      var val =  $scope.ingredient.ingredientVal;
      $scope.ingredients.$add ({
        name: name,
        value: val
      }).then(function(ref){
        console.log(ref);
      }, function(error){
        console.log(error);
      });
    };
  
    var ref2 = firebase.database().ref().child('RecipeTable/'+$scope.searchText+'/Instructions');
    $scope.steps = $firebaseArray(ref2);
  
    var ref3 = firebase.database().ref().child('RecipeTable/'+$scope.searchText+'/Video');
    $scope.videos = $firebaseArray(ref3);
  });

  $scope.trustedSrc = function(src){
    return $sce.trustAsResourceUrl(src);
  };

  $scope.selection = [];
  $scope.selectedItems = function selectedItems(){
    return filterFilter($scope.ingredients, { selected: true });
  };

  /*Watch items for changes*/
  $scope.$watch('ingredients|filter:{selected:true}', function(nv) {
    $scope.selection = nv.map(function(ingredient) {
      return ingredient.name;
    });
  }, true);

  /* add ingredients to cart */
  $scope.addtoCart = function(){
    CommonProp.setSelectedItems($scope.selection);
    $scope.items = CommonProp.getSelectedItems();
    /* Get ingredients table from database. Check each element against the selected list.
    If present add it to a new list along with price ,qty */
    var setCartRef = firebase.database().ref().child('PricePerUnitTable');

    var updates = {};
    updates['user_id'] = 1;
    var totalQuantity = 0;
    var totalCost = 0;
    /* store ingredients requested from recipe page to shoppingcart table in Firebase Realtime Database */
    /* cart is stored in database here to persist the cart items in case user navigates to different pages
      before actually placing the order */
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
                        cost: cost,
                        unit: snap.val().unit
                    };
                    firebase.database().ref().child('/ShoppingCart/Cart1/Ingredients').update(ingredientInfo);

                }
            });
        });
    });
    $window.location.href = "#!/cart";
  };

  /* fetch cart details */
  var fetchcartRef = firebase.database().ref().child('/ShoppingCart/Cart1');
  $scope.cartInfo = $firebaseArray(fetchcartRef);

  fetchcartRef.on('value', function(snapshot) {
    $scope.totalQuantity = snapshot.val().totalQuantity;
  });

}])

.service('cartService', function(){
    var ingredient1 = "";
    var ingredient1Quantity = "";
    return {
      setIngredient: function(value){
        ingredient1 = value;
      },
      getIngredient: function(){
        return ingredient1;
      },
      setIngredientQuantity: function(value){
        ingredient1Quantity = value;
      },
      getIngredientQuantity: function(){
        return ingredient1Quantity;
      }
    }
  })
