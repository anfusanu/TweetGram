var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../config/config')
const { ObjectId } = require('mongodb')


const verifyLogin = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.redirect('/admin');
  }
}

adminUser = "admin@xyz.com";
adminPass = "#4dm1n3r$";

router.get('/', function (req, res) {
  if (req.session.admin) {
    res.redirect('/admin/home')
  } else {
    if (req.session.adminInvalid) {
      var message = 'Username or password is incorrect';
      req.session.adminInvalid = false;
    }
    res.render('Admin/admin_login', { message: message });
  }
});

router.post('/adminLoginForm', function (req, res) {
  formData = req.body;

  if (formData.password == adminPass && formData.username == adminUser) {
    req.session.admin = "Admin";
    res.redirect('/admin/home');

  } else {
    req.session.adminInvalid = true
    res.redirect('/admin')

  }

});

router.get('/signout', function (req, res) {
  req.session.admin = null;
  res.redirect('/admin')
});

router.get('/home', verifyLogin, function (req, res) {
  res.render('Admin/admin_home', { layout: 'Admin/admin_layout', home_active_html: true })
});

router.get('/users_mngmt', verifyLogin, function (req, res) {

  db.get().collection('login').find().toArray()
    .then((result) => {
      if (!result) {
        res.redirect('/admin');
      } else {
        res.render('Admin/admin_users', { layout: 'Admin/admin_layout', data: result, user_active_html: true });
      }
    })
    .catch(error => console.error(error))
});

router.get('/user_add', verifyLogin, function (req, res) {
  message = false;
  if (req.session.userAddErr) {
    message = true
    req.session.userAddErr = false;
  }
  res.render('Admin/user_add', { layout: 'Admin/admin_layout', user_active_html: true, message: message })
});

router.post('/add_userForm/', verifyLogin, function (req, res) {
  formData = req.body;
  formData.status = true;
  bcrypt.hash(formData.password, 10)
    .then(hash => {
      formData.password = hash;
      db.get().collection('login').findOne({ email: formData.email })
        .then(result => {
          if (result) {
            req.session.userAddErr = true;
            res.redirect('/admin/user_add');
          } else {
            db.get().collection('login').insertOne(formData);
            res.redirect('/admin/users_mngmt')

          }
        }).catch(error => console.error(error))
    }).catch(error => console.error(error))


});
router.get('/delete_user/:tagId', verifyLogin, function (req, res) {
  var delQuery = { _id: ObjectId(req.params.tagId) };
  db.get().collection('login').deleteOne(delQuery)

  res.redirect('/admin/users_mngmt');

});

router.get('/edit_user/:tagId', verifyLogin, function (req, res) {
  var editQuery = { _id: ObjectId(req.params.tagId) };
  db.get().collection('login').findOne(editQuery)
    .then(result => {
      res.render('Admin/user_edit', { layout: 'Admin/admin_layout', result: result, user_active_html: true });

    }).catch(error => console.error(error));
});

router.post('/edit_userForm/', verifyLogin, function (req, res) {
  var formData = req.body;
  var editQuery = { _id: ObjectId(formData.id) };
  var updateQuery = {
    $set: { name: formData.name, email: formData.username }
  }

  db.get().collection('login').updateOne(editQuery, updateQuery)
    .then((result) => {
      res.redirect('users_mngmt');
    })
    .catch(error => console.error(error))
});

router.get('/block_user/:tagId', verifyLogin, function (req, res) {
  var editQuery = { _id: ObjectId(req.params.tagId) };
  db.get().collection('login').findOne(editQuery)
    .then(result => {
      if (result.status) {
        updateQuery = {
          $set: { status: false }
        }
      } else {
        updateQuery = {
          $set: { status: true }
        }
      }
      db.get().collection('login').updateOne(editQuery, updateQuery)
        .then((result) => {
          res.redirect('/admin/users_mngmt');
        })
    }).catch(error => console.error(error));
});


router.get('/reset_user/:tagId', verifyLogin, function (req, res) {

  var editQuery = { _id: ObjectId(req.params.tagId) };
  db.get().collection('login').findOne(editQuery)
    .then(result => {
      bcrypt.hash(result.email, 10)
        .then(hash => {
          updateQuery = {
            $set: { password: hash }
          }
          db.get().collection('login').updateOne(editQuery, updateQuery)
            .then((result) => {
              res.redirect('/admin/users_mngmt');
            })
        })
        .catch(error => console.error(error))
    }).catch(error => console.error(error));
});

router.get('/search', verifyLogin, function (req, res) {
  const Fuse = require('fuse.js');
  if (req.query.search) {
    db.get().collection('login').find({}).toArray()
      .then( async result => {
        if (result.length == 0) {
          res.render('Admin/admin_search', { layout: 'Admin/admin_layout', home_active_html: true, noResult : 'No Result' })
        } else {

          res.render('Admin/admin_search', { layout: 'Admin/admin_layout', home_active_html: true, data : result })
        }

      }).catch(error => console.error(error))
  } else {
    res.render('Admin/admin_search', { layout: 'Admin/admin_layout', home_active_html: true })
  }
});

router.get('/tweets', verifyLogin, function (req, res) {

  db.get().collection('messages').find().toArray()
    .then((result) => {
      if (!result) {
        res.redirect('/admin');
      } else {
        res.render('Admin/admin_tweet', { layout: 'Admin/admin_layout', data: result, user_tweet_html: true });
      }
    })
    .catch(error => console.error(error))
});
router.get('/delete_tweet/:tagId', verifyLogin, function (req, res) {
  var delQuery = { _id: ObjectId(req.params.tagId) };
  db.get().collection('messages').deleteOne(delQuery)

  res.redirect('/admin/tweets');

});


module.exports = router;
