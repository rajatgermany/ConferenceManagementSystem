var Regisform = require('../models/registerModel.js');
var ConForm = require('../models/conferenceModel.js');
var FileForm = require('../models/FileModel.js');
var path = require('path');




var Chair = {

    MakeConferenceGET : function(req,res)

    // Checking the User in Session if its in Session then makeConference Page is sent

    {if(req.session.user){
            if(req.session.user.Chair){

                res.sendFile((path.join(__dirname, '/./../public/components/Chair/makeConference.html')));
            }
            else {
                res.sendFile('./HtmlFiles/forbidden.html', {root: __dirname});
            }
        }
        else {
            res.redirect('/ConferenceManagement/user/login');
        }

    },



    MakeConferencePOST : function(req,res){    // Posting the Make Conference Form Data

        var rajat = new ConForm({

            Title: req.body.Title,
            Time: req.body.Time,
            Street: req.body.Street,
            Category: req.body.Category,
            Subcategories : {SubCategory1 : {Name : req.body.SubCategory1.Name , Description : req.body.SubCategory1.Description },
                SubCategory2 : {Name : req.body.SubCategory2.Name , Description : req.body.SubCategory1.Description2 }},

            City: req.body.City,
            Country: req.body.Country,
            Owner : req.session.user._id,
            LastDataOFSubmission : req.body.LastTime,

        });
        rajat.save();
        res.send("ConferenceMade");



    },


    MyConferences :function(req,res){
        if(req.session.user)
        {
            if(req.session.user.Chair== true){

                res.sendFile((path.join(__dirname, '/./../public/components/Chair/myConferences.html')));
            }
            else {

                res.sendFile('./HtmlFiles/forbidden.html', {root: __dirname});
            }
        }
        else {
            res.redirect('/ConferenceManagement/user/login');
        }


    },


    MyConferencesAll : function(req,res){  // Sending all the Conferences made by Login User
        ConForm.find({Owner: req.session.user._id}, function (err, docs) {
            res.send(docs);
        });


    },

    MyConferenceDetail : function(req,res){

        ConForm
            .findOne({_id:req.query.Name})
            .populate('Owner', 'Name')
            .exec(function (err, story) {
                if (err) return handleError(err);
                res.render('conference', {user: story }, function (err, html) {
                    res.send(html);
                });

            });


    },



    MyConferenceFiles : function(req,res){   // Getting all the Files uploaded to the Conference
        FileForm
            .find({Conference: req.query.ID})
            .populate('Author')
            .exec(function (err, story) {
                if (err) return handleError(err);
                res.render('conferencefile', {user: story}, function (err, html) {
                    res.send(html);
                });

            });


    },

    MyConferenceEdit : function(req,res){
        ConForm.findOne({_id: req.query.id}, function (err, docs) {
            res.render('editconference', {user: docs}, function (err, html) {
                res.send(html);
            });
        });
    },

    MyConferenceUpdate : function(req,res){

        ConForm.findOneAndUpdate({ Owner:req.session.user._id }, { Title: req.body.Title, Time: req.body.Time, Street: req.body.Street,
            Category: req.body.Category, City :req.body.City, Country: req.body.Country, LastDataOFSubmission:req.body.LastTime ,Subcategories : {SubCategory1 : {Name : req.body.SubCategory1 , Description : req.body.Description1 },
                SubCategory2 : {Name : req.body.SubCategory2 , Description : req.body.Description2 }},} ,function(err, user) {
            if (err) throw err;


            res.redirect('/ConferenceManagement/chair/myconferences');
        });


    },

    MyConferenceSetStatus : function(req,res){   // Setting the Status to the Files uploaded to the Conference
        FileForm.find({_id: req.query.id}, function (err, doc) {

            // THree types of Status Chair can set
            if (req.body.Status == 'Rejected') {
                  FileForm.findOneAndRemove({_id: req.query.id}, function (err) {
                    if (err) throw err;
                });
            }
            else if (req.body.Status == 'Pending') {
                FileForm.findOneAndUpdate({_id: req.query.id}, {
                    Status: req.body.Status,
                    Disable: false
                }, function (err, user) {
                });
            }

            else {
                FileForm.findOneAndUpdate({_id: req.query.id}, {
                    Status: req.body.Status,
                    Disable: true
                }, function (err, user) {
                });
            }

            // if no files uploaded to the Conference

            FileForm
                .find({Conference: doc[0].Conference})
                .populate('Author', 'Name')
                .exec(function (err, story) {
                    if( story.length == 0){
                        res.send('No Files Uploaded');
                    }
                    else{
                        res.send(story);
                    }
                });
        });
    },



    MyConferenceSetReviewerGET : function(req,res){  // Setting the Reviewer with checking that paper is not assigned to the person who is both Author and Reviewer
        FileForm
            .findOne({_id:req.query.id })
            .exec(function (err, story) {
                Regisform
                    .find({Reviewer:true})
                    .exec(function(err, docs) {
                        var a =[];
                        for( i in docs) {
                            if (docs[i]._id == story.Author.toString()){
                                // do nothing
                                }
                            else {
                                a.push(docs[i]);
                            }
                        }
                        res.render('setreviewer', {user: a, FileID: req.query.id}, function (err, html) {
                            res.send(html);

                        });
                    });
            });


    },


    MyConferenceSetReviewerPOST : function(req,res){

        // Posting the Reviewer

        FileForm.findOne({_id: req.query.id}, function (err, user) {
            if (err) throw err;
            if (user.ReviewerAssigned.Status == 'Reviewer Assigned') {
                user.ReviewerAssigned.ReviewerID = req.body.Status;
                user.ViewReview = 'NotSet';
                user.ReviewStatus = 'NotSet';
                user.save(function (err) {
                    if (err) throw err;
                    var j = {"ConferenceID": user.Conference, "ReviewerID": req.body.Status};
                    res.send(JSON.stringify(j));
                });
            }
            else if (user.ReviewerAssigned.Status == 'Not Assingned') {
                user.ReviewerAssigned.Status = 'Reviewer Assigned';
                user.ReviewerAssigned.ReviewerID = req.body.Status;
                user.save(function (err) {
                    if (err) throw err;
                    var j = {"ConferenceID": user.Conference, "ReviewerID": req.body.Status};
                    res.send(JSON.stringify(j));
                });
            }
        });

    },


    // Getting all the Conferences
    AllConferences : function(req,res){
        ConForm
            .find({})
            .populate('Owner')
            .exec(function (err, story) {
                if (err) return handleError(err);
                res.render('allconferences', {user: story, value: req.session.user}, function (err, html) {
                    res.send(html);
                });
            });
    },


    // aLL files uploaded to the Conference
    MyConferenceFiles : function(req,res){
        FileForm
            .find({Conference: req.query.ID})
            .populate('Author')
            .exec(function (err, story) {
                if (err) return handleError(err);
                res.render('conferencefile', {user: story}, function (err, html) {
                    res.send(html);
                });

            });
    }


}


module.exports = Chair
