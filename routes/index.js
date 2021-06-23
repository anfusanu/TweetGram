var express = require('express');
var router = express.Router();

const helper = require('../helpers/chatHelper');
const passport = require('passport')

const verifyLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

const notLogin = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    next()
  }
}


/* GET home page. */
router.get('/', verifyLogin, function (req, res, next) {
  helper.getMessages(messages => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.render('index', { messages, user: req.session.user })
  })
});

router.get('/login', notLogin, function (req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.render('login');

});



router.get('/login/google', notLogin,
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    helper.googleLogin(req.user._json, user => {
      if (user.userExist) {
        req.session.user = { username: user.userName, id: user.userId, img: user.img };
        res.redirect('/');
      } else res.redirect('/auth.png');
    })
  });


router.get('/logout', verifyLogin, function (req, res, next) {
  req.session.destroy()
  res.redirect('/login')
});


module.exports = router;
