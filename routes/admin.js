var Regisform = require('../models/registerModel.js');
var path = require('path');



var Admin ={
    Home : function(req,res){
        res.sendFile((path.join(__dirname, '/./../public/components/Admin/admin.html')));  // Admin Home Page is sent
    },

    Users : function(req,res){
        if (req.body.Email == 'rajatuiet@gmail.com' && req.body.Password == 'rajat'){
            Regisform.find({}, function (err, docs) {
                res.send(docs)  // Sending All Users Registered to the App
            })
        };
    },

    // Updating the User Status
    Update : function(req,res){
        Regisform.findOneAndUpdate({ _id: req.body._id }, { Status: req.body.Status } ,function(err, user) {
            if (err) throw err;
        });
        Regisform.find({  }, function(err,docs) {
            if (err) throw err;
            res.send(docs);

        });
    }
}

module.exports = Admin