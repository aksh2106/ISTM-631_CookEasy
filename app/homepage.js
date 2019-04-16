'use strict';

angular.module('cookEasy.homepage', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/homepage', {
    templateUrl: 'homepage.html',
    controller: 'homepageCtrl'
  });
}])

.controller('homepageCtrl', ['$scope', '$firebaseArray', '$window', 'CommonProp', function($scope, $firebaseArray, $window, CommonProp){

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

  var ref = firebase.database().ref().child('UserTestimonials');
  $scope.testimonials = $firebaseArray(ref);

  $scope.$watch('searchText', function(){
    CommonProp.setSearchText($scope.searchText);
  });

  $scope.toggleSearch = function(){
    $scope.showSearch = !$scope.showSearch;
  };

  $scope.redirectToRecipe = function(){
    $window.location.href='#!/recipe#top';
  };

  $scope.setSearchText = function(value) {
    CommonProp.setSearchText(value);
    /*$window.location.href='#!/recipe#top';*/
  };

  $scope.validateRecipe = function(value) {
    var ref = firebase.database().ref('/RecipeTable');
    var rec = $firebaseArray(ref);
    var tosearch = $scope.searchText;
    tosearch = tosearch.replace(/[\s]/g, '').toLowerCase();
    rec.$loaded().then(function(){
      angular.forEach(rec, function(record){
        if(record.$id == tosearch){
          CommonProp.setSearchText(tosearch);
          $scope.errormsg=false;
          $window.location.href='#!/recipe#top';
        }
      });
      $scope.errormsg=true;
      //console.log("Recipe not found. Please try again");
    });
  };


  var fetchcartRef = firebase.database().ref().child('/ShoppingCart/Cart1');
  $scope.cartInfo = $firebaseArray(fetchcartRef);

  fetchcartRef.on('value', function(snapshot) {
    $scope.totalQuantity = snapshot.val().totalQuantity;
  });

  $scope.subscribe = function() {
    console.log("updating DB");
    var ref = firebase.database().ref().child('/Subscribers');
    ref.push({email: $scope.emailId});
    $scope.subscribeSuccess = true;
  };

  $scope.subscribeSuccess = false;
}])
