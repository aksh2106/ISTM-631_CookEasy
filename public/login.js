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



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
    var path = "/home.html";
    window.location.href = path;

  } 
});


app.controller('LoginCtrl', ['$scope', '$window', '$firebaseArray',
    function($scope, $window, $firebaseArray) {


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