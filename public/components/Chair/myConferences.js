var app = angular.module("myconferences", []);
app.controller('maincontroller', function ($scope, $http, $window) {

    
    var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/chair/myconferences/all", $scope.Conference, {});
    responsePromise.success(function (dataFromServer, status, headers, config) {

        $scope.data = dataFromServer;
    });
    responsePromise.error(function (data, status, headers, config) {
        alert("Submitting form failed!");
    });


    var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/user/userinsession", {});
    responsePromise.success(function (dataFromServer, status, headers, config) {

        console.log(dataFromServer)
        $scope.user = dataFromServer;
    });
    responsePromise.error(function (data, status, headers, config) {
        alert("Submitting form failed!");
    });
    
    $scope.Files = function (i) {


        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/chair/myconferences/files/?" + 'ID=' + i;
        $window.location.href = landingUrl;
    }



    $scope.Edit = function (ID) {
        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/myconferences/edit/?" + 'id=' + ID;
        $window.location.href = landingUrl;


    }

});






