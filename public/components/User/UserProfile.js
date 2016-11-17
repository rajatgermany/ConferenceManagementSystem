/**
 * Created by Mani on 28-08-2016.
 */
var app = angular.module("newApp", []);

app.controller('newCtrl', function ($scope, $http, $window) {
    $scope.data = {};

    $scope.$evalAsync(function () {
        console.log($scope.user);
        console.log($scope.user.Role);
        if ($scope.user.Role == 'CHAIR') {

            console.log('hiii');
            $scope.a = true;
            $scope.b = true;
        }

        if ($scope.user.Role == 'REVIEWER') {


            $scope.b = true;


        }

        else {


            $scope.a = false
            $scope.b = false

        }


    });


    $scope.yo = function(user) {



        if ($scope.user.Role == 'CHAIR') {

            console.log('hiii');
            $scope.a = true;
            $scope.b = true;


        }

        if ($scope.user.Role == 'REVIEWER') {


            $scope.b = true;


        }

        else {


            $scope.a = false
            $scope.b = false

        }
    };



    $scope.SubmittedFiles = function (ID) {
        console.log(ID);


        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/author/submissions/?" + 'id=' + ID;
        $window.location.href = landingUrl;


    }


    $scope.EditReview = function (ID) {
        console.log(ID);


        var host = $window.location.host;
        var landingUrl = "http://" + host + "/ConferenceManagement/user/profile/?" + 'id=' + ID;
        $window.location.href = landingUrl;


    }


});



/**
 * Created by Mani on 29-08-2016.
 */
