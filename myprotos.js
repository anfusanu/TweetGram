
var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/integration_test", function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

// Reuse database object in request handlers
app.get("/", function(req, res) {
  db.collection("replicaset_mongo_client_collection").find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        console.log(doc);
      }
      else {
        res.end();
      }
    });
  });
});

// Sign Up form in normal mode
router.post('/signupForm', verifyLogin, function (req, res) {
  data = req.body;
  MongoClient.connect(url, async function (err, client) {
    if (err) {
      console.log("ERROR");
    }
    else {
      let loginDoc = await client.db(dbName).collection('login').findOne({ email: data.username })
      if (loginDoc) {
        res.send("already exist");
      }
      else {
        client.db(dbName).collection('login').insertOne({ name: data.name, email: data.username, password: data.password, status: true });
        res.redirect('/');
      }
    }
  });
});






// Before Bcrypt in promise form
router.post('/loginForm', function (req, res) {
  formData = req.body;

  MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      const loginCol = client.db(dbName).collection('login');

      loginCol.findOne({ email: formData.username, password: formData.password })
        .then((result) => {
          if (!result) {
            req.session.invalid = true
            res.redirect('/user')
          } else {
            req.session.user = result.name;
            res.redirect('/user/home');
          }
        })
        .catch(error => console.error(error))
    })
});



// Search method for Message.. still in development may have to look at text index/search

router.get('/search', verifyLogin, function (req, res) {
  if (req.query.search) {
    MongoClient.connect(url, { useUnifiedTopology: true })
      .then(client => {
        messages = client.db(dbName).collection('messages');
        messages.find({ message: req.query.search }).toArray()
          .then(result => {
            if(result.length == 0){
              res.render('Admin/admin_search', { layout: 'Admin/admin_layout', home_active_html: true,noResult:'No Result' })
            }else{
              res.render('Admin/admin_search', { layout: 'Admin/admin_layout', home_active_html: true,data:result })


            }

          }).catch(error => console.error(error))
      }).catch(error => console.error(error))
  } else {
    res.render('Admin/admin_search', { layout: 'Admin/admin_layout', home_active_html: true })
  }
});