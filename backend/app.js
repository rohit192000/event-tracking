const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();



const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/subCategory');
const eventRouter = require('./routes/event'); 
const subeventRouter = require('./routes/subevent')
const userRouter = require('./routes/user')
const usereventRouter = require('./routes/userevents');
const app = express();
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send("request");
})
app.use('/category', categoryRouter);
app.use('/subcategory', subCategoryRouter);
app.use('/event', eventRouter);
app.use('/subevent', subeventRouter);
app.use('/users', userRouter);
app.use('/userevent', usereventRouter);

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
  res.render('error');
});

module.exports = app;
