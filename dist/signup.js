'use strict';

angular.module('cookEasy.signup', ['ngRoute', 'firebase', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/signup', {
    templateUrl: 'signup.html',
    controller: 'AddUserCtrl'
  });
}])

.controller('AddUserCtrl', ['$scope', '$window', '$firebaseArray', function($scope, $window, $firebaseArray) {

    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     console.log('inside if');
    //     var path = "/home.html";
    //     window.location.href = path;
    
    //   } 
    //   console.log('outside if');
    // });

     var usersRef = firebase.database().ref().child('UserDetails');

     $scope.users = $firebaseArray(usersRef);

     $scope.addUser = function () {

            // CREATE A UNIQUE ID
            var timestamp = new Date().valueOf();

            $scope.users.$add({
                Userid: timestamp,
                Name: $scope.Name,
                Password: $scope.Password,
                Phone: $scope.Phone, 
                Address: $scope.Address, 
                City: $scope.City, 
                State: $scope.State, 
                Zip: $scope.Zip, 
                Email: $scope.Email,
            });

            var email = $scope.Email;
            var password = $scope.Password;

             

            firebase.auth().setPersistence('local')
            .then(function() {
            
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
                user.updateProfile({
                displayName: $scope.Name
                })
                var path = "/home.html";
                $window.location.href = path;
            }).catch(function(error) {
                window.alert('Error creating account');
            });
           
             })
            .catch(function(error) {
             // Handle Errors here.
             var errorCode = error.code;
             var errorMessage = error.message;
            });

        };

}]);