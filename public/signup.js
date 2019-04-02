var app = angular.module('cookEasyApp', ['ngRoute', 'firebase']);

app.controller('AddUserCtrl', ['$scope', '$window', '$firebaseArray',
    function($scope, $window , $firebaseArray) {

    var usersRef = new Firebase('https://cookeasy-36dd0.firebaseio.com');

    $scope.users = $firebaseArray(usersRef);

     $scope.addUser = function () {

            // CREATE A UNIQUE ID
            var timestamp = new Date().valueOf();

            $scope.users.$add({
                id: timestamp,
                name: $scope.Name,
                password: $scope.Password,
                phone: $scope.Phone, 
                address: $scope.Address, 
                city: $scope.City, 
                state: $scope.State, 
                zip: $scope.Zip, 
                email: $scope.Email,

            });

            var path = "/home.html";
            $window.location.href = path;
        };

}]);