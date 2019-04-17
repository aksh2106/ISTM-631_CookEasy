'use strict';

/* initialize orderConfirmation module in angular */
angular.module('cookEasy.orderConfirmation', ['ngRoute', 'firebase'])

/* routes for orderConfirmation.html page */
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/orderConfirmation', {
    templateUrl: 'orderConfirmation.html',
    controller: 'orderConfirmationCtrl'
  });
}])

/* controller logic for confirming order and generating order number, also clearing cart items for new session */
.controller('orderConfirmationCtrl', ['$scope', '$firebaseArray', '$window', 'CommonProp', function($scope, $firebaseArray, $window, CommonProp){
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

  /* signout functionality */
  $scope.signOut = function(){
    firebase.auth().signOut().then(function() {
      // Sign out successful.
      firebase.database().ref().child('/TempTable/userIdInContext').remove();
      firebase.database().ref().child('/TempTable/userNameInContext').remove();
    }, function(error) {
      console.log(error);
    });
  }
  
  /* fetch user testimonials from database */
  var ref = firebase.database().ref().child('UserTestimonials');
  $scope.testimonials = $firebaseArray(ref);

  $scope.$watch('searchText', function(){
    CommonProp.setSearchText($scope.searchText);
  });

  $scope.toggleSearch = function(){
    $scope.showSearch = !$scope.showSearch;
  };

  $scope.redirectToRecipe = function(){
    $window.location.href='/#!/recipe';
  };

  $scope.setSearchText = function(value) {
    CommonProp.setSearchText(value);
    $window.location.href='/#!/recipe';
  };
  document.getElementById("orderNumber").innerHTML = (Math.random()*1000000).toFixed(0);

  var fetchcartRef = firebase.database().ref().child('/ShoppingCart/Cart1');
  $scope.cartInfo = $firebaseArray(fetchcartRef);

  fetchcartRef.on('value', function(snapshot) {
    $scope.totalQuantity = snapshot.val().totalQuantity;
  });

  /* remove recipe and user persisted in scope throughout user journey */
  firebase.database().ref().child('/ShoppingCart/Cart1').remove();
  firebase.database().ref().child('/TempTable/recipeInContext').remove();
}])
