
var Regisform = require('../models/registerModel.js');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var Promise = require('promise');


var User = {


    RegisterPOST: function (req, res) {

        var promise = new Promise(function (resolve, reject) {
            Regisform.find({Email: req.body.Email}, function (err, docs) {
                resolve(docs)
            })
        })

            promise.then(function(docs) {
                if (docs.length != 0) {

                    res.send('EmailAlreadyExist')
                    reject('')
                }
                else {


                    var rajat = new Regisform({           // User Profile Saved

                        Name: req.body.Name,
                        Email: req.body.Email,


                        Phone: req.body.Contact,
                        Address: {City: req.body.City, Country: req.body.Country},
                        Author: false,
                        Reviewer: false,
                        Chair: false,
                        Status: 'Reject',
                        Chat: req.body.Name + req.body.Email
                    });

                    var promise2 = new Promise(function (resolve, reject) {
                        rajat.save(function (err, docs) {

                            resolve(rajat)
                        })
                    })
                    promise2.then(function (rajat) {
                        var promise3 = new Promise(function (resolve, reject) {
                            bcrypt.genSalt(10, function (err, salt) {
                                resolve(salt);
                            })
                        })

                        promise3.then(function (salt) {
                            var promise4 = new Promise(function (resolve, reject) {
                                bcrypt.hash(req.body.Password, salt, function (err, hash) {
                                    resolve(hash)
                                })

                            })
                            promise4.then(function (hash) {
                                rajat.Password = hash;
                                return rajat


                            }).then(function (rajat) {
                                var promise5 = new Promise(function (resolve, reject) {
                                    rajat.save(function (err, docs) {

                                        resolve(rajat)
                                    })
                                })
                                promise5.then(function (rajat) {



                                    if (req.body.Author && req.body.Reviewer) {
                                        rajat.Author = true
                                        rajat.Reviewer = true
                                        rajat.Chair = false
                                    }
                                    if (req.body.Author && rajat.Reviewer == false) {

                                        rajat.Author = true
                                        rajat.Reviewer = false
                                        rajat.Chair = false
                                    }

                                    if (req.body.Reviewer && rajat.Author == false) {
                                        rajat.Author = false
                                        rajat.Reviewer = true
                                        rajat.Chair = false
                                    }

                                    if (req.body.Chair) {
                                        rajat.Author = false
                                        rajat.Reviewer = false
                                        rajat.Chair = true
                                    }


                                    return rajat;


                                }).then(function (rajat) {

                                    var promise6 = new Promise(function (resolve, reject) {
                                        rajat.save(function (err, docs) {

                                            resolve(rajat)
                                        })

                                    })

                                    promise6.then(function (resolve) {

                                        var transporter = nodemailer.createTransport({
                                            service: 'Gmail',
                                            auth: {
                                                user: 'rajatuiet@gmail.com', // Your email id
                                                pass: 'rajatccna' // Your password
                                            },
                                            tls: {
                                                rejectUnauthorized: false
                                            }
                                        });


                                        // setup e-mail data with unicode symbols
                                        var mailOptions = {
                                            from: "rajatuiet@gmail.com", // sender address
                                            to: req.body.Email, // list of receivers
                                            subject: "Hello", // Subject line
                                            html: '<b>Hello, <strong>hiiii</strong>, Thanks for registering with us , please verify your email by clicking on th e link<b>yooo</b></p>' +
                                            '<a href="http://localhost:3500/login/?id="  >Verify</a>',

                                            text: 'Hello world from \n\n' + req.body.Name

                                        }

                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, function (error, res) {
                                            if (error) {

                                            } else {

                                            }


                                        })

                                        return rajat;


                                    }).then(function (rajat) {


                                        res.json({message: 'User Registered', user: rajat});

                                    })
                                })
                            })
                        })
                    })

                }

            })

},




    LoginPOST: function (req, res) {


        Regisform.findOne({Email: req.body.Email}, function (err, docs) {

            if (docs) {
                if (docs.Status == 'Accept') {                                                             // Admin res Checked Here
                    bcrypt.compare(req.body.Password, docs.Password, function (err, result) {
                        // Password ash comparison

                        if (result == true) {
                            req.session.user = docs;
                            res.json({message: 'Login Successful', session:req.session.user})
                        }
                        else {
                            //Redirected to login Page on Password Mismatch

                            res.json({message: 'Password Mismatch'})
                        }
                    });
                }
                else {                                                               // User req denied or still waiting for updation from admin
                    res.json({message:'Request Not Accepted By admin'});
                }
            }
            else {
                res.json({message: 'Email Not Registered'})
            }
        });
    },

    Logout: function (req, res) {
        req.session.user = null;
        res.redirect('/ConferenceManagement/home');

    },


    Profile : function(req,res){
        Regisform.find({_id:req.query.id},function(err,docs){
            res.render('viewprofile', {user: docs}, function (err, html) {
                res.send(html);
            });
        })


    },
    GetSessionUser : function(req,res) {
        if (req.session.user) {
            Regisform.findOne({_id: req.session.user._id}, function (err, docs) {
                res.json(docs)
            })
        }

        else {
            res.json({message : 'No session'})
        }
    }

}


module.exports = User





