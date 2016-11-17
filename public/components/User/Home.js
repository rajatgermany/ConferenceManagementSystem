var app = angular.module('ConferenceManagementHome', ['mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.tooltip', 'mgcrea.ngStrap.alert','ngAnimate' , 'Authentication', 'btford.socket-io'])
app.factory('Socket', function (socketFactory) {
    return socketFactory();
});

app.controller('ConferenceManagementCtrl', function($scope, $http, $modal, Socket){
    var responsePromise = $http.get("http://localhost:3500/ConferenceManagement/user/userinsession", {});
    responsePromise.success(function (dataFromServer, status, headers, config) {

        if(dataFromServer.message == 'No session'){
            $modal({templateUrl: '/components/Authentication/LoginFormModal.html', controller: 'loginController', show: true});
        }
        $scope.data = dataFromServer;
    });
    responsePromise.error(function (data, status, headers, config) {
        alert("Submitting form failed!");
    });
})
