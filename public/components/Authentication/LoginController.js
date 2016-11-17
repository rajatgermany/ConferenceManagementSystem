var app = angular.module('Authentication', []);
app.controller('loginController', function($scope, $http, $window, $alert,$rootScope, $modal){
    $scope.Login = {};
    // Login    Form Data
    $scope.submit = function(loginData) {
        var responsePromise = $http.post("http://localhost:3500/ConferenceManagement/user/login", loginData, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {
            var host = $window.location.host;
            console.log(dataFromServer)
            if (dataFromServer.message  == 'Login Successful')
            {
                $alert({
                    title: 'Login Successful!',
                    content: 'Enjoy Your Stay',
                    animation: 'am-fade-and-slide-top',
                    placement: 'auto',
                    type: 'success',
                    keyboard: false,
                    container: 'body',
                    show: true
                });
                $window.location.href = "http://" + host + "/ConferenceManagement/home"  // Redirected to Home on Succesful
            }
            else if (dataFromServer.message  == 'Email Not Registered'|| dataFromServer.message  == 'Password Mismatch' )
            {
                $scope.res = dataFromServer.message; // Unsuccessful messages  sent to the User
            }
            $scope.res = dataFromServer;
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });
    }
    // Shows the register Modal
    $scope.showRegisterModal = function(){
        $modal({templateUrl: '/components/Authentication/RegisterFormModal.html', controller: 'registerController', show: true})
    }




});

