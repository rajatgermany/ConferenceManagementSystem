var app = angular.module('registerform', []);
app.controller('maincontroller', function($scope, $http, $window) {


    $scope.Login = {};

    $scope.submitForm = function() {
        console.log('jiiiii')
        console.log($scope.Login);



        var responsePromise = $http.post("http://localhost:3500/ConferenceManagement/user/login", $scope.Login, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {

            var host = $window.location.host;


            if (dataFromServer == 'password and email match')
            {

                var landingUrl = "http://" + host + "/ConferenceManagement/home"
            }
            else {

                var landingUrl = "http://" + host + "/ConferenceManagement/user/login";
                $scope.res = dataFromServer;
            }


            alert(landingUrl);
            $window.location.href = landingUrl;
            $scope.res = dataFromServer;
        });
        responsePromise.error(function(data, status, headers, config) {



            alert("Submitting form failed!");
        });



    }



});



