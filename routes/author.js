var Regisform = require('../models/registerModel.js');
var ConForm = require('../models/conferenceModel.js');
var FileForm = require('../models/FileModel.js');

exports.Submissions =  function(req,res){    // Getting the Author Submitted Files

    FileForm
            .find({Author:  req.session.user._id})
            .populate('Conference')  // Populating with Conference Model to the Conference ID and Conference Owner
            .exec(function (err,docs) {
                if(docs.length !=0) {
                    res.render('authorfiles', {user: docs})
                }
                else { // if no Files are Submitted to the Conference
                    res.render('authorfiles', {user: docs, message2:'No files submitted yet'});
                }
            });
    };

    exports.EditSubmissionGET = function(req,res){   // Form to Edit the Submission

        FileForm.find({_id:req.query.id}, function(err,docs){
            res.render('Editauthorfiles', {user: docs[0]}, function (err, html) {
                res.send(html);
            });
        });

    };

   exports.EditSubmissionPOST = function (req,res){   // Get the Updated Submission File Data

       if(req.files.length == 0)    // if the user is not uploading the newFile

        {
            var a = [{CoAuthor1Name: req.body.CoAuthor1Name,
                CoAuthor1Email: req.body.CoAuthor1Email},
                {CoAuthor2Name: req.body.CoAuthor2Name,
                    CoAuthor2Email:req.body.CoAuthor2Email}];
            FileForm.findOneAndUpdate({_id: req.body.FileID}, {Title:req.body.Title, Abstract:req.body.Abstract,
                Coauthor: a}, function(err,docs){

                res.redirect('/ConferenceManagement/author/submissions?' + 'id=' + docs.Author)  // Redirecting to the Author Submissions
            });

        }

        else {   // if the user has uploaded the new File
            var a = [{CoAuthor1Name: req.body.CoAuthor1Name,
                CoAuthor1Email: req.body.CoAuthor1Email},
                {CoAuthor2Name: req.body.CoAuthor2Name,
                    CoAuthor2Email:req.body.CoAuthor2Email}];

            FileForm.findOneAndUpdate({_id: req.body.FileID}, {Title:req.body.Title, OriginalName : req.files[0].originalname, Abstract:req.body.Abstract,
                Coauthor: a}, function(err,docs){
                res.redirect('/ConferenceManagement/author/submissions?' + 'id=' + docs.Author)
            });
        }
    };

    exports.WithdrawSubmission  = function(req,res){  // Withdraw Author Submissions
        FileForm.findOne({_id: req.query.id},  function(err,docs) {
            var a = docs.Author;
            FileForm.findOneAndRemove({_id: req.query.id}, function (err, docs) {
                res.redirect('/ConferenceManagement/author/submissions?' + 'id=' + a);
            });
        });

    };







