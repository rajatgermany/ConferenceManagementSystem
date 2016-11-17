var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer');
var nodemailer = require('nodemailer');
var session = require ('client-sessions');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var router = express.Router();


mongoose.connect("mongodb://localhost/conferencemanagementdb20");
var db = mongoose.connection;


var Schema = mongoose.Schema;







/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*/


// Register Schema


var RegisterSchema2 =  Schema({


    Name: String,
    Email : String,
    Password : String,
    Phone : String,
    Address : {Country : String , City : String},
    Author: {type:Boolean, Default: false},
    Reviewer : Boolean,
    Chair : Boolean ,
    Status :String,
    Verify : String
});

var Regisform1 = mongoose.model('Regisform1', RegisterSchema2);




var ConferenceSchema =  Schema({


    Title: String,
    Time : String,
    Street : String,
    Category : String,
    Subcategories : {SubCategory1 : {Name : String , Description : String }, SubCategory2 : {Name : String , Description : String }},

    City: String,
    Country :String,
    Owner : { type: Schema.Types.ObjectId, ref: 'Regisform1' },
    LastDataOFSubmission:  { type: Date } });

var ConForm = mongoose.model('ConForm', ConferenceSchema);

var FileSchema13 = Schema({


    OriginalName : String,
    Destination : String,
    Author :  { type: Schema.Types.ObjectId, ref: 'Regisform1' },
    Status : String,
    Title:String,
    SubCategory: String,
    Conference : { type: Schema.Types.ObjectId, ref: 'ConForm' },
    ReviewerAssigned: {Status:String, ReviewerID:String},
    ReviewStatus : String,
    ViewReview : String,
    Coauthor:[],
    Abstract: String,
    Disable: Boolean

});







var  FileForm10 = mongoose.model('FileForm10', FileSchema13);




var ReviewSchema = Schema({


    TopicFamiliarity : String,
    Acceptance : String,
    StrongPoints: String,
    WeakPoints : String,
    Comments: String,
    Summary : String,
    File: String,
    ReviewerID:String


});







var  Review = mongoose.model('Review', ReviewSchema);

module.exports = Regisform1

/**
 * Created by Mani on 06-09-2016.
 */
