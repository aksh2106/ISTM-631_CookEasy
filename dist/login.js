'use strict';

/* Set up module and depencies*/
angular.module('cookEasy.login', ['ngRoute', 'firebase', 'ngSanitize', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$window', 'CommonProp', '$firebaseArray', '$mdDialog',function($scope, $window, CommonProp, $firebaseArray, $mdDialog) {
   
    /* If user is logged in take them to the home page*/
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $window.location.href = '/#!/homepage'
        } 
      });

    var usersRef = firebase.database().ref();

    $scope.users = $firebaseArray(usersRef);

    /* Retrieve email and password from the form, send them to the Friebase auth API*/
     $scope.login = function () {
        var email = $scope.Email;
        var password = $scope.Password;

        firebase.auth().setPersistence('local')
        .then(function() {
        
            /* Successful Login*/
            firebase.auth().signInWithEmailAndPassword(email, password).then(function() {

                var updates = {};
                updates['userNameInContext'] = email;
                firebase.database().ref().child('/TempTable').update(updates);
                
                CommonProp.setEmail(email);
                
                $window.location.href = '/#!/homepage';
            }).catch(function(error) {
        /* Create and display error dialog*/   
                alert = $mdDialog.alert()
        .title('Attention')
        .content('Incorrect login credentials!')
        .ok('Ok');

      $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
            });
        
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };


    /* Redirect to password reset page*/
    $scope.resetPassword = function () {

        $window.location.href = '/#!/reset';

    };  

}]);