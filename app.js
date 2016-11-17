
// NodeModules
var express = require('express');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer');
var nodemailer = require('nodemailer');
var session = require ('client-sessions');
var bodyParser = require('body-parser');

var config = require('./config/appconfiguration.js')
mongoose.connect(config.Db());
var routes = require('./routes/index.js');
var app = express();

// Session Middleware
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Static Files
app.use(express.static('public'));

var users = [];
var messages = [];



app.get('/ConferenceManagement/home', function (request, response) {

    response.sendFile('./public/components/User/Home.html', {root: __dirname});

});

app.get('/ConferenceManagement/chat', function (request, response) {

    response.sendFile('./public/components/Chat/chat.html', {root: __dirname});

});

app.use('/ConferenceManagement', routes);





module.exports = app;


