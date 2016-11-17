var express = require('express');
var router = express.Router();
var path = require('path')
var multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (path.join(__dirname, '/./../uploads')))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage});





var user = require('./user.js');
var author  = require('./author.js');
var chair = require('./chair.js')
var reviewer = require('./reviewer.js')
var file = require('./file.js')
var profile = require('./profile.js')
var admin = require('./admin.js')


//Registration/Authentication

router.post('/user/register', user.RegisterPOST);
router.post('/user/login', user.LoginPOST);
router.get('/user/logout', user.Logout)
router.get('/user/profile', user.Profile)
router.get('/user/userinsession', user.GetSessionUser)







//author
router.get('/author/submissions', author.Submissions)
router.get('/author/editsubmissions', author.EditSubmissionGET)
router.post('/author/editsubmissions',upload.any(), author.EditSubmissionPOST)
router.get('/author/withdrawsubmissions', author.WithdrawSubmission)

// reviewer

router.get('/reviewer/reviewfiles', reviewer.ReviewFiles)
router.post('/reviewer/reviewtemplate', reviewer.ReviewTemplate)
router.get('/reviewer/reviewtemplatebefore', reviewer.ReviewTemplateBefore)
router.get('/reviewer/reviewtemplateafter', reviewer.ReviewTemplateAfter)
router.get('/reviewer/viewreview', reviewer.ViewReview)
router.get('/reviewer/editreview', reviewer.EditReview)
router.post('/reviewer/editreview', reviewer.UpdateReview)

// Chair
router.get('/chair/makeconference', chair.MakeConferenceGET);
router.post('/chair/makeconference', chair.MakeConferencePOST);
router.get('/chair/myconferences', chair.MyConferences);
router.get('/chair/myconferences/all', chair.MyConferencesAll)
router.get('/chair/myconference/detail', chair.MyConferenceDetail)
router.get('/chair/myconference/files', chair.MyConferenceFiles)
router.get('/chair/myconference/edit', chair.MyConferenceEdit)
router.post('/chair/myconference/edit', chair.MyConferenceUpdate)
router.post('/chair/myconferences/setstatus', chair.MyConferenceSetStatus)
router.get('/chair/myconferences/setreviewer', chair.MyConferenceSetReviewerGET)
router.post('/chair/myconferences/setreviewer', chair.MyConferenceSetReviewerPOST)
router.post('/chair/myconferences/setreviewer', chair.MyConferenceSetReviewerPOST)
router.get('/chair/allconferences', chair.AllConferences)
router.get('/chair/myconferences/files/', chair.MyConferenceFiles)


// Files
router.get('/files/upload', file.UploadGET);
router.post('/files/upload', upload.any(), file.UploadPOST);
router.get('/files/download', file.DownloadFile);

//MyProfile

router.get('/myprofile', profile.MyProfile)
router.get('/myprofile/delete', profile.MyProfileDelete)
router.get('/myprofile/view', profile.MyProfileView)
router.get('/myprofile/edit', profile.MyProfileEdit)
router.post('/myprofile/edit', profile.MyProfileUpdate)

//Admin

router.get('/admin', admin.Home)
router.post('/admin', admin.Users)
router.post('/admin/update', admin.Update)



module.exports = router ;