var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var hbs = require('hbs')
var db = require('./config/config')

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerHelper('calc', function(v1) {
  return v1 +7;
});

hbs.registerHelper('ifeq', function(arg1, arg2, options) {
  console.log(`arg1 is ${arg1} and arg2 is ${arg2}`)
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('eq', function () {
  const args = Array.prototype.slice.call(arguments, 0, -1);
  return args.every(function (expression) {
      return args[0] === expression;
  });
});
hbs.registerHelper('if_eq', function () {
	const args = Array.prototype.slice.call(arguments, 0, -1);
    const options = arguments[arguments.length - 1];
	const allEqual = args.every(function (expression) {
  		return args[0] === expression;
  	});
    
    return allEqual ? options.fn(this) : options.inverse(this);
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: 'keyboard_cat',
  cookie: { maxAge: 6000000 },
  resave: false,
  saveUninitialized: true

}))
db.connect((err)=>{
  if (err){
    console.log('Database Error');
  }else{
    console.log('Database Connected');
  }
}
);
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{layout:null});
});

module.exports = app;
