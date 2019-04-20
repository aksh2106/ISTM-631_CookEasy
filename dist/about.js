'use strict';

/* initialize about page module in angular */
angular.module('cookEasy.about', ['ngRoute', 'firebase'])

/* routes for about.html page */
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/about', {
    templateUrl: 'about.html',
    controller: 'aboutCtrl'
  });
}])

/* controller logic for enabling sign in/sign out, allowing recipe search in about page */
.controller('aboutCtrl', ['$scope', '$firebaseArray', '$window', 'CommonProp', function($scope, $firebaseArray, $window, CommonProp){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.divText = 'Hello, ' + CommonProp.getDisplayName() + '! ';
      $scope.show = !$scope.show;
      $scope.$apply();
    } 
  });

  /*Check if admin is logged in*/
  if(CommonProp.getAdminView())
  {
      $scope.divText = 'Hello, ' + 'Admin' + '! '; 
      $scope.admin = !$scope.admin;
      $scope.show = !$scope.show;
  }



  /* sign out functionality */
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
  
  var fetchcartRef = firebase.database().ref().child('/ShoppingCart/Cart1');
  $scope.cartInfo = $firebaseArray(fetchcartRef);

  fetchcartRef.on('value', function(snapshot) {
    $scope.totalQuantity = snapshot.val().totalQuantity;
  });
}])
