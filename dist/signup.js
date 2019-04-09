'use strict';

angular.module('cookEasy.signup', ['ngRoute', 'firebase', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/signup', {
    templateUrl: 'signup.html',
    controller: 'AddUserCtrl'
  });
}])

.controller('AddUserCtrl', ['$scope', '$window', 'CommonProp', '$firebaseArray', function($scope, $window, CommonProp, $firebaseArray) {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $window.location.href = '/#!/homepage'
      } 
    });

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

                CommonProp.setDisplayName($scope.Name);
                $window.location.href = '/#!/homepage'
            }).catch(function(error) {
                window.alert('Error creating account' + error);
            });
           
             })
            .catch(function(error) {
             // Handle Errors here.
             var errorCode = error.code;
             var errorMessage = error.message;
            });

        };

}]);