var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Regisform = require('./registerModel.js');

var ConferenceSchema =  Schema({


    Title: String,
    Time : String,
    Street : String,
    Category : String,
    Subcategories : {SubCategory1 : {Name : String , Description : String }, SubCategory2 : {Name : String , Description : String }},

    City: String,
    Country :String,
    Owner : { type: Schema.Types.ObjectId, ref: 'Regisform' }, //For populating with Owner personal information
    LastDataOFSubmission:  { type: Date }


});


module.exports = mongoose.model('ConForm', ConferenceSchema);
