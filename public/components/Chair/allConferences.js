var app = angular.module("allconferences", []);
app.controller('maincontroller', function ($scope, $http, $window){

    $scope.conference = function(i) {
        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/files/upload?" + 'id=' + i._id;
        $window.location.href = landingUrl;
    }
    var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/user/userinsession", {});
    responsePromise.success(function (dataFromServer, status, headers, config) {
        console.log(dataFromServer)
        $scope.data = dataFromServer;
    });
    responsePromise.error(function (data, status, headers, config) {
        alert("Submitting form failed!");
    });

});

