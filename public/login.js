var app = angular.module('cookEasyApp', ['ngRoute', 'firebase']);

app.controller('LoginCtrl', ['$scope', '$window', '$firebaseArray',
    function($scope, $window , $firebaseArray) {


    var usersRef = new Firebase('https://cookeasy-36dd0.firebaseio.com');

    $scope.users = $firebaseArray(usersRef);

     $scope.login = function () {

          
                var login = false;

                angular.forEach($scope.users, function(user) {
                 
                 if(user.email === $scope.Email && user.password === $scope.Password)
                 {
                    var path = "/home.html";
                    $window.location.href = path;
                    login = true;
                 }

            });

            if(!login)
            window.alert('Incorrect Login Credentials!');

        };

}]);