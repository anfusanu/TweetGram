var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var hbs = require('hbs')
var db = require('./config/config')


var app = express();

var indexRouter = require('./routes/index');

const server = require('http').createServer(app);
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log(msg);
    var dt = new Date()
    db.get().collection('messages').insertOne({
      senderId: msg.userId,
      senderName: msg.user,
      message: msg.message,
      date: (dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear()),
      time: (dt.getHours() + ':' + dt.getMinutes())
    })
      .then((result) => {
        // console.log(result);

      })
      .catch(error => console.error(error))

    socket.broadcast.emit('message', msg)
  })

})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



hbs.registerHelper('ifeq', function (arg1, arg2, options) {
  // console.log(`arg1 is ${arg1} and arg2 is ${arg2}`)
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard_cat',
  cookie: { maxAge: 6000000 },
  resave: false,
  saveUninitialized: true

}))
db.connect((err) => {
  if (err) {
    console.log('Database Error');
  } else {
    console.log('Database Connected');
  }
}
);
app.use('/Nacmen', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { layout: null });
});

module.exports = { app: app, server: server };
