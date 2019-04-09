'use strict';

angular.module('cookEasy.contact', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/contact', {
    templateUrl: 'contact.html',
    controller: 'contactCtrl'
  });
}])

.controller('contactCtrl', ['$scope', '$firebaseArray', '$window', 'CommonProp', function($scope, $firebaseArray, $window, CommonProp){
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

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var tempRef = firebase.database().ref().child('/TempTable');
      $scope.temp = $firebaseArray(tempRef);
      tempRef.on('value', function(snapshot) {
        if(snapshot.val().userNameInContext != "")
        $scope.divText = 'Hello, ' + snapshot.val().userNameInContext + '! ';
        else
        $scope.divText = 'Hello!'

        $scope.show = !$scope.show;

        $scope.$apply();
      });
    } 
  });

  $scope.signOut = function(){

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      console.log(error);
    });
    
  }
}])
