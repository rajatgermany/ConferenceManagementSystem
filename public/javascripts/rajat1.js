/**
 * Created by Mani on 28-08-2016.
 */

var app = angular.module('newApp', []);
app.controller('newCtrl', function($scope){

    $scope.a ='yiiii'
    console.log($scope.users)
    $scope.$evalAsync(function () {
        console.log($scope.users);
    });


})