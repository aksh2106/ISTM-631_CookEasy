'use strict';

angular.module('cookEasy.recipe', ['ngRoute', 'firebase', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/recipe', {
    templateUrl: 'recipe.html',
    controller: 'welcomeCtrl'
  });
}])

.controller('welcomeCtrl', ['$scope','$firebaseArray', '$sce', 'CommonProp', 'filterFilter', '$window', function($scope,$firebaseArray, $sce, CommonProp, filterFilter, $window){

  $scope.searchText = CommonProp.getSearchText();
  $scope.title = $scope.searchText;

  //Remove spaces
  $scope.searchText = $scope.searchText.replace(/[\s]/g, '');

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

  $scope.addtoCart = function(){
    CommonProp.setSelectedItems($scope.selection);
    $window.location.href = "#!/cart";
  };

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
