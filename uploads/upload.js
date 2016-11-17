/**
 * Created by Mani on 26-08-2016.
 */
var app = angular.module('next-update-stats', []);
app.controller('next-update-stats-controller',function($scope, $http, $window) {
    $scope.File = {};


    $scope.ID = {};

    $scope.yo = function(){

        console.log($scope.File);
    }




    $scope.submitForm = function() {
        console.log('hiii');



        var responsePromise = $http.post("http://localhost:3500/upload", $scope.File, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {
            $scope.res = dataFromServer;
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });
    }


});

