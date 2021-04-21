var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('../config/config')


const verifyUser = (req, res, next) => {
  if (req.session.user) {
    next();
  }
  else {
    res.redirect('/user');
  }
}

/* GET users listing. */
router.get('/', function (req, res) {
  if (req.session.user) {
    res.redirect('/user/home')
  } else {
    message = false;
    if (req.session.invalid) {
      var message = true;
      req.session.invalid = false;
    }
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.render('User/user_login', { message: message });
  }

});

router.get('/signup', function (req, res) {
  message = false;
  if (req.session.userSignupErr) {
    message = true
  }
  res.render('signup', { message: message })
  req.session.destroy();
});


router.post('/signupForm', function (req, res) {
  var formData = req.body;

  bcrypt.hash(formData.password, 10).then(hash => {
    formData.password = hash;

    db.get().collection('login').findOne({ email: formData.username })
      .then((result) => {
        if (!result) {
          db.get().collection('login').insertOne({
            name: formData.name,
            email: formData.username,
            password: formData.password,
            status: true
          })
            .then(inserted => {
              req.session.user = inserted.ops[0].name;
              req.session.docId = inserted.ops[0]._id;
              res.redirect('/user/home');
            })

        } else {
          req.session.userSignupErr = true;
          res.redirect('/user/signup');
        }
      })
      .catch(error => console.error(error))
  }).catch(error => console.error(error))
});


router.post('/loginForm', function (req, res) {
  formData = req.body;

  db.get().collection('login').findOne({ email: formData.username })
    .then((result) => {
      if (!result) {
        req.session.invalid = true
        res.redirect('/user')
      } else {
        if (result.status) {
          bcrypt.compare(formData.password, result.password)
            .then(check => {
              if (check) {
                req.session.user = result.name;
                req.session.docId = result._id;
                res.redirect('/user/home');
              } else {
                req.session.invalid = true
                res.redirect('/user')
              }
            })
        }
        else {
          res.render('error', { status: '403', message: 'You are Banned', layout: '' })
        }
      }
    })
    .catch(error => console.error(error))
});


router.get('/home', verifyUser, function (req, res) {
  db.get().collection('messages').find().toArray()
    .then((messages) => {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.render('User/user_home', { layout: 'User/user_layout', messages: messages, user: `${req.session.user}`, docId: req.session.docId })
    })
    .catch(error => console.error(error))
});

router.post('/tweetForm', verifyUser, function (req, res) {
  var formData = req.body;
  var dt = new Date()
  db.get().collection('messages').insertOne({
    senderId: req.session.docId,
    senderName: req.session.user,
    message: formData.message,
    date: (dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear()),
    time: (dt.getHours() + ':' + dt.getMinutes())
  })
    .then((result) => {
      console.log(result);

    })
    .catch(error => console.error(error))
  res.redirect('/user/home')
});

router.get('/logout', function (req, res) {
  req.session.user = null;
  res.redirect('/user')
});


module.exports = router;
