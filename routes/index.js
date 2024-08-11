var express = require('express');
var router = express.Router();
const userController = require('../controllers/User.js');
const folderController = require('../controllers/Folder.js');
const fileController = require('../controllers/File.js');
const upload = require('../multer');
/* GET home page. */
router.get('/', function(req, res){
  res.redirect('/log-in');
});

router.get('/log-in', userController.log_in_get);

router.post('/log-in', userController.log_in_post);

router.get('/sign-up', function(req, res) {
  res.render('sign_up',{
    title: 'Sign Up',
  });
});

router.post('/sign-up', userController.sign_up_post);

router.get('/home', folderController.home);

router.get('/create/folder', function(req, res){
  res.render('create_folder', {
    title: 'Create New Folder',
  });
});

router.post('/create/folder', folderController.create_folder);

router.get('/folder/:id', folderController.folder_details);

router.get('/create/file/:id', function(req, res){
  res.render('create_file', {
  title: 'Upload file',
})});

router.post('/create/file/:id', upload.single('image'), fileController.upload);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});




module.exports = router;
