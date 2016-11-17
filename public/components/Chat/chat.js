
var app = angular.module('Chat', ['mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.alert','ngAnimate' , 'btford.socket-io'])
app.factory('Socket', function (socketFactory) {
    return socketFactory();
});
app.controller('ChatController', function($scope, $http, $modal, Socket, $timeout, $window) {
    $scope.users = [];
    $scope.messages = [];
    var Username ;
    $window.onbeforeunload = function (e) {
    }
    var chatModal = $modal({templateUrl: '/components/Chat/ChatModal.html', scope: $scope, show: true})
    Socket.connect();
    $scope.verifyPassword = function(data){
        Username = data.Email;
        Socket.emit('verfiypassword', {credentials:data})
    }

    Socket.on('passwordverification', function(data){
        if(data.message == 'NotAuthenticated'){
            $scope.res = 'Wrong Credentials'
        }
        else {
            chatModal.hide();
            Socket.emit('request-users', {})
        }
    })
    Socket.on('users', function (data) {
        $scope.users = data.users
    })
    $scope.sendMessage = function(msg){
        if(msg != null && msg != '')
        {
            Socket.emit('message', {message: {username : Username , message : msg}})
            $scope.msg = '';
        }
    }

    Socket.on('message', function(data){
        $scope.messages.push(data);
    })
});

/**
 * Created by Mani on 17-11-2016.
 */
