
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

 // Downloading the Files Assigned
    $scope.Download = function(ID) {
        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/files/download/?" + 'id=' + ID;
        $window.location.href = landingUrl;
    };

   // Setting the Review
    $scope.GiveReviewbefore= function(ID) {
        console.log(ID);
        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/reviewer/reviewtemplatebefore/?" + 'id=' + ID;
        $window.location.href = landingUrl;
    }

    $scope.GiveReviewafter= function(ID) {
        console.log(ID);
        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/reviewer/reviewtemplateafter/?" + 'id=' + ID;
        $window.location.href = landingUrl;

    };

    $scope.ViewReview = function(ID,name) {
        if (ID != 'NotSet') {
            $scope.a = 'Review'
            var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/reviewer/viewreview/?" + 'id=' + ID, {}, {});
            responsePromise.success(function (dataFromServer, status, headers, config) {
                $scope.review = dataFromServer;
            });
            responsePromise.error(function (data, status, headers, config) {
                alert("Submitting form failed!");
            });
        }
        else {
            $scope.a = 'NoReview'
        }
    }


    $scope.EditReview= function(ID) {
        console.log(ID);
        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/reviewer/editreview/?" + 'id=' + ID;
        $window.location.href = landingUrl;
    }
    });
