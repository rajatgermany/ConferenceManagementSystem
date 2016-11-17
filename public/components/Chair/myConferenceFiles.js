/**
 * Created by Mani on 28-08-2016.
 */
var app = angular.module("newApp", ['mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.tooltip', 'mgcrea.ngStrap.alert','ngAnimate' ]);
app.controller('newCtrl', function ($scope, $http, $window,$alert, $tooltip) {

    $scope.tooltip = {
        "title": "Hello Tooltip<br />This is a multiline message!",
        "checked": true
    };

    var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/user/userinsession", {});
    responsePromise.success(function (dataFromServer, status, headers, config) {

        console.log(dataFromServer)
        $scope.value = dataFromServer;
    });
    responsePromise.error(function (data, status, headers, config) {
        alert("Submitting form failed!");
    });





    $scope.data = {};

    // Set the status of the uploaded files
    $scope.SetStatus = function (ID, Status) {
        $scope.data.Status = Status;
        console.log($scope.data);

        var responsePromise = $http.post("http://localhost:3500/ConferenceManagement/chair/myconferences/setstatus?" + 'id=' + ID, $scope.data, {});
        responsePromise.success(function (dataFromServer, status, headers, config) {
            $scope.title = 'Status Updated'
            $alert({
                title: 'Status Updated !',
                animation: 'am-fade-and-slide-top',
                placement: 'left',
                type: 'success',

                show: true
            });

            if(dataFromServer == 'No Files Uploaded'){
                $scope.status = 'No Files Uploaded'
                $scope.a = true;
            }
            else{

                $scope.user = dataFromServer
            }


        });
        responsePromise.error(function (data, status, headers, config) {
            alert("Submitting form failed!");
        });


    }

    // Set the Reviewer to the Paper
    $scope.SetReviewer = function (ID) {
        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/chair/myconferences/setreviewer/?" + 'id=' + ID;
        $window.location.href = landingUrl;


    }


    // Profile of the Author/Reviewer
    $scope.ViewProfile = function (ID) {
        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/user/profile/?" + 'id=' + ID;
        $window.location.href = landingUrl;


    }

    //  Getting the Review Set by the Reviewer
    $scope.ViewReview = function (ID) {
        var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/reviewer/viewreview/?" + 'id=' + ID, {}, {});
        responsePromise.success(function (dataFromServer, status, headers, config) {
            $scope.review = dataFromServer;

        });
        responsePromise.error(function (data, status, headers, config) {
            alert("Submitting form failed!");
        });

    }


});


