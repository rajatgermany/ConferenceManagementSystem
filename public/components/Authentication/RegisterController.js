angular.module('Authentication')
    .controller('registerController', function($scope, $http, $window) {
    $scope.Register = {};
    $scope.Roles = ["AUTHOR","REVIEWER", "CHAIR" ];
        $scope.City = ['a','b', 'c']
        $scope.Country = ['a','b', 'c']
// Register Form Data Added
    $scope.submitForm = function() {
        var responsePromise = $http.post("http://localhost:3500/ConferenceManagement/user/register", $scope.Register, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {
            $scope.res = dataFromServer;
            var host = $window.location.host;
            if(dataFromServer == 'EmailAlreadyExist'){  // If Email Already Exists
                $scope.a = false;
                $scope.res = dataFromServer;
            }
            else{
                $scope.a = true;
                $scope.res = dataFromServer;
                console.log("hdhdhdhdhdhdhd")
                $window.location.href = "http://" + host + "/ConferenceManagement/home";
            }
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });
    }
});
