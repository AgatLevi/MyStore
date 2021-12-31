const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const adminRouter = require('./routes/adminRoutes');


// STATIC
app.use(express.static(`${__dirname}/public`));


// add params to request
app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});


// ROUTES 
// admin [filters, products]
app.use('/admin/', adminRouter);


// localhost
app.use(cors());


// MIDDLEWEAR
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  console.log('RUNNING IN DEVELOPMENT MODE');
  app.use(morgan('dev'));
} else {
  console.log('RUNNING IN PRODUCTION MODE');
}


// error handler
app.use(globalErrorHandler);


// 404
app.all('*', (req, res, next) => {
  let err = new AppError(`the requested url ${req.originalUrl} not found`, 404);

  next(err);
});

module.exports = app;
