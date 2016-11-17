var app = angular.module('registerform', []);
app.controller('maincontroller', function($scope, $http) {

    $scope.Admin = {};
    $scope.b = true;

    // Admin verification
    $scope.submitForm = function() {
        console.log($scope.Login);
        var responsePromise = $http.post("http://localhost:3500/ConferenceManagement/admin", $scope.Admin, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {
            $scope.contact = dataFromServer;
            $scope.a = true;
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });


        // Status Updation
        $scope.update = function(i){
            var responsePromise = $http.post("http://localhost:3500/ConferenceManagement/admin/update", i, {});
            responsePromise.success(function(dataFromServer, status, headers, config) {
                $scope.contact = dataFromServer;
                $scope.a = true;
                $scope.b = false;
                $scope.c = i.Name;


            });
            responsePromise.error(function(data, status, headers, config) {
                alert("Submitting form failed!");
            });

        }



    }


});
