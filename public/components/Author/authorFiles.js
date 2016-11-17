

var app = angular.module("newApp", ['mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.tooltip', 'mgcrea.ngStrap.alert','ngAnimate' ]);
app.controller('newCtrl', function ($scope, $http, $window, $modal) {
    $scope.data = {};


    $scope.b = '';


    // Checking if user is in Session
    var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/user/userinsession", {});
    responsePromise.success(function (dataFromServer, status, headers, config) {
        $scope.data = dataFromServer;
    });
    responsePromise.error(function (data, status, headers, config) {
        alert("Submitting form failed!");
    });



    $scope.ViewReview = function (ID,reviewstatus) {
        if(reviewstatus == 'NotSet'){
            $window.alert('ReviewNotSet')
            $scope.review = {};
        }
        else {
            var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/reviewer/viewreview/?" + 'id=' + ID, {}, {});
            responsePromise.success(function (dataFromServer, status, headers, config) {
                $scope.review = dataFromServer;
                $modal({templateUrl: '/components/Author/ReviewModel.html', scope:$scope ,show: true});
                console.log($scope.review[0]); });
            responsePromise.error(function (data, status, headers, config) {
                alert("Submitting form failed!");
            });
        }

    }



    // EdiT Submission

    $scope.EditSubmission = function(ID) {
        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/author/editsubmissions?" + 'id=' + ID;
        $window.location.href = landingUrl;


    }

    // Author Can Withdraw Submmission
    $scope.WithdrawSubmission = function(ID) {
        var x;
        if (confirm("Do you want to withdraw the file?") == true) {
            var host = $window.location.host;
            var landingUrl = "http://" + host + "/ConferenceManagement/author/withdrawsubmissions?" + 'id=' + ID;
            $window.location.href = landingUrl;

        } else {
            x = "You pressed Cancel!";
        }
    }

    // Check the Status of the Paper
    $scope.showStatus = function(i){
        if(i.Status == 'Closed'){
            $scope.a = 'Closed';
            i.disable = true;
        }
        else {
            $scope.a = i.Status;
        }
    }
});

