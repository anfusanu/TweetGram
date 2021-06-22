router.get('/signup', function (req, res) {

    bcrypt.hash('admin', 10).then(hash => {
  
      db.get().collection('login').findOne({ email: 'mycks45@gmail.com' })
        .then((result) => {
          if (!result) {
            db.get().collection('login').insertOne({
              name: 'Babushka',
              email: 'mycks45@gmail.com',
              password: hash,
              status: true
            })
              .then(inserted => {
                req.session.user = { username: inserted.ops[0].name, userId: inserted.ops[0]._id }
                res.redirect('/chat');
              })
  
          } else {
            req.session.userSignupErr = true;
            res.redirect('/login');
          }
        })
        .catch(error => console.error(error))
    }).catch(error => console.error(error))
  });