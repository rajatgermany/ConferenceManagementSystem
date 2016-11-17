var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Regisform = require('./registerModel.js');
var ConForm = require('./conferenceModel.js');
var FileSchema = Schema({


    OriginalName : String,
    Destination : String,
    Author :  { type: Schema.Types.ObjectId, ref: 'Regisform' }, //Populating with Author Personal information
    Status : String,
    Title:String,
    SubCategory: String,
    Conference : { type: Schema.Types.ObjectId, ref: 'ConForm' }, // Populating with Conference information
    ReviewerAssigned: {Status:String, ReviewerID:String},
    ReviewStatus : String,
    ViewReview : String,
    Coauthor:[],
    Abstract: String,
    Disable: Boolean

});

module.exports = mongoose.model('FileForm', FileSchema);
