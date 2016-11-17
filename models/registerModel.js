var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegisterSchema =  Schema({
    Name: String,
    Email : String,
    Password : String,
    Phone : String,
    Address : {Country : String , City : String},
    Author: {type:Boolean, Default: false},
    Reviewer : Boolean,
    Chair : Boolean ,
    Status :String,
    Verify : String,
    Chat : String
});

module.exports = mongoose.model('Regisform', RegisterSchema);
