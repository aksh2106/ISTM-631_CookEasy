'use strict';

/* Set up module and depencies*/
angular.module('cookEasy.signup', ['ngRoute', 'firebase', 'ngSanitize', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/signup', {
    templateUrl: 'signup.html',
    controller: 'AddUserCtrl'
  });
}])

.controller('AddUserCtrl', ['$scope', '$window', 'CommonProp', '$firebaseArray', '$mdDialog', function($scope, $window, CommonProp, $firebaseArray, $mdDialog) {

      /* If user is logged in take them to the home page*/
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $window.location.href = '/#!/homepage'
      } 
    });

  

     var usersRef = firebase.database().ref().child('UserDetails');

     $scope.users = $firebaseArray(usersRef);

     /* Retrieve user details from the form and send them to the Firebase create user API */
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

             
            /* Store login details in 'local' cache*/
            firebase.auth().setPersistence('local')
            .then(function() {
            
            /* If successful, store details in Firebase database*/
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
              var updates = {};
              updates['userIdInContext'] = timestamp;
              updates['userNameInContext'] = $scope.Name;
              firebase.database().ref().child('/TempTable').update(updates);                


              CommonProp.setDisplayName($scope.Name);
                $window.location.href = '/#!/homepage'
                
            }).catch(function(error) {
              
              /* Create and display error dialog*/   
                switch(error.code)
                {
                  case 'auth/email-already-in-use': 
                  alert = $mdDialog.alert()
        .title('Attention')
        .content('A similar email is already in use!')
        .ok('Ok');

      $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });

                }
            });
           
             })
            .catch(function(error) {
             // Handle Errors here.
             var errorCode = error.code;
             var errorMessage = error.message;
            });

        };

}]);