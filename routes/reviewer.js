var FileForm = require('../models/FileModel.js');
var Review = require('../models/reviewModel');




var Reviewer = {

    ReviewFiles: function (req, res) { // Getting the Review fIles assigned to the Reviewer

        FileForm.find({
            'ReviewerAssigned.Status': 'Reviewer Assigned',
            'ReviewerAssigned.ReviewerID': req.session.user._id
        }, function (err, docs) {
            if (docs.length != 0) {   //
                res.render('reviewfiles', {
                    user: docs,
                    ReviewID: req.query.id,
                    message: req.query.ID
                }, function (err, html) {
                    res.send(html);
                });
            }
            else {
                res.render('reviewfiles', { //If no reviewfiles assigned
                    user: docs,
                    ReviewID: req.query.id,
                    message: 'No files assigned Yet'
                }, function (err, html) {
                    res.send(html);
                });
            }
        });

    },


    ReviewTemplate: function (req, res) {   // Posting the Review
        var rajat = new Review({
            TopicFamiliarity: req.body.TopicFamiliarity,
            Acceptance: req.body.TopicFamiliarity,
            StrongPoints: req.body.StrongPoints,
            WeakPoints: req.body.WeakPoints,
            Comments: req.body.Comments,
            Summary: req.body.Summary,
            File: req.body.ID,
            ReviewerID: req.session.user._id

        });
        rajat.save();

        FileForm
            .findOneAndUpdate({_id: req.body.ID}, {
                ReviewStatus: 'ReviewSET',
                ViewReview: rajat._id
            }, function (err, user) {
                if (err) throw err;
                res.redirect('/ConferenceManagement/reviewer/reviewfiles?' + 'id=' + rajat._id);

            });


    },

    ReviewTemplateBefore: function (req, res) {
        res.render('reviewformbefore', {FileID: req.query.id}, function (err, html) {
            res.send(html);
        })

    },


    ReviewTemplateAfter: function (req, res) {
        res.render('reviewformafter', {FileID: req.query.id}, function (err, html) {
            res.send(html);
        });


    },


    ViewReview: function (req, res) { // View the Review
        Review.find({_id: req.query.id}, function (err, docs) {
            res.send(docs)
        });

    },

    EditReview: function (req, res) { // Getting the Review tobe edit
        FileForm.find({_id: req.query.id}, function (err, docs) {
            Review.find({_id: docs[0].ViewReview}, function (err, docs) {
                if (docs) {
                    res.send(docs[0])
                }
                else {
                    res.send(docs);
                }
            });

        });
    },

    UpdateReview: function (req, res) {  // Updating the Review

        Review.findOneAndUpdate({_id: req.query.id}, {
            TopicFamiliarity: req.body.TopicFamiliarity,
            Acceptance: req.body.Acceptance,
            StrongPoints: req.body.StrongPoints,
            WeakPoints: req.body.WeakPoints,
            Comments: req.body.Comments,
            Summary: req.body.Summary
        }, function (err, user) {
            if (err) throw err;

        });
        Review.find({_id: req.query.id}, function (err, user) {
            if (err) throw err;
            res.send(user);
        });
    }


}



module.exports = Reviewer






