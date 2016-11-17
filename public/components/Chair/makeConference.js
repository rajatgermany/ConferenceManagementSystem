var app = angular.module('makeconference', ['mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.tooltip', 'mgcrea.ngStrap.alert','ngAnimate']);
app.controller('newCtrl', function($scope,  $location, $http, $window,$modal) {
    // Get the Details of user in session
    var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/user/userinsession", {});
    responsePromise.success(function (dataFromServer, status, headers, config) {
        $scope.user = dataFromServer;
    });
    responsePromise.error(function (data, status, headers, config) {
        alert("Submitting form failed!");
    });
    $scope.Conference = {};
    $scope.Roles = [
        "AUTHOR", "REVIEWER",
        "CHAIR"];
    $scope.City = ['a', 'b', 'c']
    $scope.Country = ['a', 'b', 'c']

    // MakeConference Form Submission
    $scope.submitForm = function() {
        console.log($scope.Conference);
        
        var responsePromise = $http.post("http://localhost:3500/ConferenceManagement/chair/makeconference", $scope.Conference, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {
            $modal({templateUrl : '/components/Chair/makeConferenceModal.html',scope : $scope ,show: true});

        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });
    }
});