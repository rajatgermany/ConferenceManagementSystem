var app = require('./app.js');
var server = app.listen(3500, function(){
    console.log('Server running on Port 3500')
});
var Regisform = require('./models/registerModel.js');

var io = require('socket.io').listen(server);

var users = [];
var messages = [];

io.sockets.on('connection', function(socket) {


    socket.on('verfiypassword', function (data) {


        Regisform.find({Chat: data.credentials.Password, Email:data.credentials.Email}, function (err, docs) {


            if (docs.length == 0) {
                socket.emit('passwordverification', {message: 'NotAuthenticated'})
            }

            else {
                console.log('else Block')
                socket.emit('passwordverification', {message: 'Authenticated'})
                users.push({username:data.credentials.Email})

            }

        })
    })


    socket.on('request-users', function () {
        console.log(users);
        socket.emit('users', {users: users})


    })

    socket.on('message', function (data) {
        io.emit('message', {message: data.message, username: data.username})


    })


});


module.exports =  server;
