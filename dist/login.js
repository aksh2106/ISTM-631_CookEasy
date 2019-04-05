'use strict';

angular.module('cookEasy.login', ['ngRoute', 'firebase', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$window', '$firebaseArray',function($scope, $window, $firebaseArray) {
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
        
    //     var path = "/home.html";
    //     window.location.href = path;
    
    //   } 
    // });

    console.log("Akshat");
    var usersRef = firebase.database().ref();

    $scope.users = $firebaseArray(usersRef);

     $scope.login = function () {
        var email = $scope.Email;
        var password = $scope.Password;

        firebase.auth().setPersistence('local')
        .then(function() {
        
            firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                var path = "/home.html";
                $window.location.href = path;
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

        var path = "/password_reset.html";
        window.location.href = path;

    };  

}]);