'use strict';

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



    $scope.submitEmail = function () {

        var email = $scope.Email;
        
        var t = false;

        firebase.auth().sendPasswordResetEmail(email).then(function()
        {

           $scope.show = !$scope.show;

          $scope.$apply();

        }).catch(function(error){


        });

       

    };  

    $scope.return = function () {

      var path = "/login.html";
      window.location.href = path;
    }

}]);