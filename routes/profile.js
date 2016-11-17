var Regisform = require('../models/registerModel.js');

var Profile = {
    MyProfile : function(req,res){  // MyProfile Html Page

      if(req.session.user){
          Regisform.findOne({_id:req.session.user._id},function(err,docs) {
              res.render('myprofile', {user: docs}, function (err, html) {
                  res.send(html);
              });
          });
      }
      else{
          res.render('loginform', {message: 'Login Please'}, function (err, html) {
              res.send(html);
          });
      }

  },


    MyProfileDelete : function(req,res){   // Deleting the User Profile
        Regisform.findOneAndRemove({_id: req.session.user._id}, function (err) {
            if (err) throw err;
            req.session.user = null;
            res.render('Deleterequest', {user: 'home'}, function (err, html) {
                res.send(html);
            });
        });
    },



    MyProfileView : function(req,res){  // User Profile
        Regisform.find({_id:req.query.id},function(err,docs){
            res.render('viewprofile', {user: docs}, function (err, html) {
                res.send(html);
            });
        })
    },



    MyProfileEdit : function(req,res){   // Getting the User Edit Profile Form
        Regisform.find({_id:req.session.user._id}, function(err,docs) {
            res.render('editmyprofile', {user: docs[0]}, function (err, html) {
                res.send(html);
            });
        });
    },



    MyProfileUpdate : function(req,res){ // Editing the User Profile Except the Role
        Regisform.findOneAndUpdate({_id: req.body.ID}, {Email:req.body.Email, Name : req.body.Title, Phone:req.body.Phone,Address: {City:req.body.City, Country:req.body.Country}}, function(err,docs){
            Regisform.findOne({_id: req.body.ID},function(err,story){
                req.session.user = story;
                res.redirect('/ConferenceManagement/myprofile');
            });
        });
    }


}


module.exports = Profile;