 var config = {
    apiKey: "AIzaSyAoy5P0YCilP18UoyeyWtf53xviVZSxtAY",
    authDomain: "cookeasy-36dd0.firebaseapp.com",
    databaseURL: "https://cookeasy-36dd0.firebaseio.com",
    projectId: "cookeasy-36dd0",
    storageBucket: "cookeasy-36dd0.appspot.com",
    messagingSenderId: "337324868275"
  };
  firebase.initializeApp(config);


var app = angular.module('cookEasyApp', ['ngRoute', 'firebase']);



app.controller('ResetCtrl', ['$scope', '$window', '$firebaseArray',
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