/**
 * Created by Mani on 29-08-2016.
 */

/**
 * Created by Mani on 28-08-2016.
 */
var app = angular.module("newApp", []);
app.controller('newCtrl', function ($scope, $http, $window){




    var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/user/userinsession", {});
    responsePromise.success(function (dataFromServer, status, headers, config) {

        console.log(dataFromServer)
        $scope.data1 = dataFromServer;
    });
    responsePromise.error(function (data, status, headers, config) {
        alert("Submitting form failed!");
    });




    $scope.$evalAsync(function () {
        console.log($scope.FileID);
        var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/reviewer/editreview/?" + 'id=' + $scope.FileID, {}, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {

            $scope.review = dataFromServer;
            console.log($scope.review);

        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");

        });


    });


    $scope.UpdateReview = function (ReviewID) {

        console.log($scope.review);


        var responsePromise = $http.post("http://localhost:3500/ConferenceManagement/reviewer/editreview/?" + 'id=' + ReviewID, $scope.review, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {

            var responsePromise1 = $http.get("http://localhost:3500/reviewer/ConferenceManagement/editReview/?" + 'id=' + $scope.FileID, {}, {});
            responsePromise1.success(function(dataFromServer, status, headers, config) {
                $scope.review = dataFromServer;
                console.log($scope.review);
            });


        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");

        });







    }











});







/**
 * Created by Mani on 29-08-2016.
 */

/**
 * Created by Mani on 30-08-2016.
 */
