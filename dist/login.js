'use strict';

angular.module('cookEasy.login', ['ngRoute', 'firebase', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$window', '$firebaseArray',function($scope, $window, $firebaseArray) {
   
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $window.location.href = '/#!/homepage'
        } 
      });

    var usersRef = firebase.database().ref();

    $scope.users = $firebaseArray(usersRef);

     $scope.login = function () {
        var email = $scope.Email;
        var password = $scope.Password;

        firebase.auth().setPersistence('local')
        .then(function() {
        
            firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                $window.location.href = '/#!/homepage';
            }).catch(function(error) {
                window.alert('Incorrect Login Credentials!');
            });
        
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };


    $scope.resetPassword = function () {

        $window.location.href = '/#!/reset';

    };  

}]);