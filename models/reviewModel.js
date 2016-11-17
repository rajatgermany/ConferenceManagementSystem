var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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


module.exports = mongoose.model('Review', ReviewSchema);
