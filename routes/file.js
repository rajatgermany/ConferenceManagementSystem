/**
 * Created by Mani on 24-10-2016.
 */

var Regisform = require('../models/registerModel.js');
var ConForm = require('../models/conferenceModel.js');
var FileForm = require('../models/FileModel.js');
var path = require('path')
var Review = require('../models/reviewModel');



var File = {

    // Getting the Upload Form rendered
    UploadGET : function(req,res) {
        ConForm
            .findOne({_id: req.query.id})
            .populate('Owner', 'Name')
            .exec(function (err, story) {
                if (err) return handleError(err);
                res.render('upload', {
                    user: req.query.id,
                    SubCategory1: story.Subcategories.SubCategory1.Name,
                    SubCategory2: story.Subcategories.SubCategory2.Name
                }, function (err, html) {
                    res.send(html);
                });
            });
    },


    UploadPOST : function(req,res){  // Posting the File Data
        if(req.session.user) {
            if (req.session.user.Author == true && req.session.user.Reviewer == true || req.session.user.Author == true) {
                var rajat = new FileForm({
                    OriginalName: req.files[0].originalname,
                    Destination: req.files[0].destination,
                    Author: req.session.user._id,
                    Status: 'Pending',
                    SubCategory: req.body.SubCategory,
                    Conference: req.body.ID,
                    ReviewerAssigned: {Status: 'Not Assingned', ReviewerID: 'Not Set'},
                    ReviewStatus: 'NotSet',
                    ViewReview: 'NotSet',
                    FileDescription: 'NotSet',
                    Coauthor: [],
                    Title: req.body.Title,
                    Abstract: req.body.Abstract,
                    Disable: false

                });
                rajat.save();
                rajat.Coauthor[0] = {
                    CoAuthor1Name: req.body.CoAuthor1Name,
                    CoAuthor1Email: req.body.CoAuthor1Email
                };
                rajat.Coauthor[1] = {
                    CoAuthor2Name: req.body.CoAuthor2Name,
                    CoAuthor2Email: req.body.CoAuthor2Email
                };
                rajat.save();
                res.redirect('/ConferenceManagement/chair/allconferences');

            }
            else {
                res.sendFile('./files/forbidden.html', {root: __dirname});
            }
        }
        else {
            res.redirect('/ConferenceManagement/user/login');
        }
    },
    DownloadFile : function(req,res){
        var file = (path.join(__dirname, '/./../uploads/'))+ req.query.id;
        res.download(file);
    }

}

module.exports =  File;