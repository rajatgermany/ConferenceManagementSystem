/**
 * Created by Mani on 26-08-2016.
 */
var app = angular.module('next-update-stats', []);
app.controller('next-update-stats-controller',function($scope, $http, $window, $alert) {
    $scope.File = {};
    $scope.ID = {};
    $scope.submitForm = function() {

        var responsePromise = $http.post("http://localhost:3500/ConferenceManagement/files/upload", $scope.File, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {
            $scope.res = dataFromServer;
            $alert({
                title: 'Status Updated !',

                animation: 'am-fade-and-slide-top',
                placement: 'left',
                type: 'success',

                show: true
            });
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });
    }


});

