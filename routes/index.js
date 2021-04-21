var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../config/config')


/* GET home page. */
router.get('/', function (req, res) {
  res.redirect('/user');
});


router.get('/lgt', function (req, res) {
  req.session.destroy();
  res.redirect('/')
});

router.get('/test', function (req, res) {
  bcrypt.hash('admin', 10)
    .then(hash => {
      console.log(hash);
      bcrypt.compare('admi', hash)
        .then(pass => {
          console.log(pass);
        })
    })
  res.redirect('/')
});

router.get('/delete/:tagId', function (req, res) {
  db.get().collection('test').deleteOne({name : req.params.tagId})
  .then(result =>{
    console.log('Success')
  })

  res.redirect('/admin/users_mngmt');

});


module.exports = router;
