/**
 * Created by Mani on 28-08-2016.
 */
var app = angular.module("newApp", []);
app.controller('newCtrl', function ($scope, $http, $window){
    $scope.data = {};


    var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/user/userinsession", {});
    responsePromise.success(function (dataFromServer, status, headers, config) {

        console.log(dataFromServer)
        $scope.data1 = dataFromServer;
    });
    responsePromise.error(function (data, status, headers, config) {
        alert("Submitting form failed!");
    });




    $scope.SetReviewer = function(ReviewerID,FileID){
        $scope.data.Status = ReviewerID;


        var responsePromise = $http.post("http://localhost:3500/ConferenceManagement/chair/myconferences/setreviewer?" + 'id=' + FileID, $scope.data, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {
            $scope.response = dataFromServer;
            console.log($scope.response.ConferenceID);
            console.log($scope.response.ReviewerID);





            var host = $window.location.host;
            var landingUrl = "http://" + host + "/ConferenceManagement/chair/myconferences/files?" + 'ID=' + $scope.response.ConferenceID +"&param2="+$scope.response.ReviewerID;
            $window.location.href = landingUrl;

        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });



    }









});
/**
 * Created by Mani on 29-08-2016.
 */
