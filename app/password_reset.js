'use strict';

/* Set up module and depencies*/

angular.module('cookEasy.resetPassword', ['ngRoute', 'firebase', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/reset', {
    templateUrl: 'password_reset.html',
    controller: 'ResetCtrl'
  });
}])

.controller('ResetCtrl', ['$scope', '$window', '$firebaseArray',
    function($scope, $window, $firebaseArray) {


    var usersRef = firebase.database().ref();

    $scope.users = $firebaseArray(usersRef);


/* Retrieve email and send it to the Firebase reset password API */
    $scope.submitEmail = function () {

        var email = $scope.Email;

        firebase.auth().sendPasswordResetEmail(email).then(function()
        {

          /* Modify UI on successful reset link being sent*/
           $scope.show = !$scope.show;

          $scope.$apply();

        }).catch(function(error){


        });

       

    };  

    /* Redirect to the login page*/
    $scope.return = function () {

      $window.location.href = '/#!/login'
    }

}]);