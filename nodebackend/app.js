const express = require('express')
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const guardianRoutes = require('./api/routes/guardian');
const nytimesRoutes = require('./api/routes/nytimes');

app.use('/guardian', guardianRoutes);
app.use('/nytimes', nytimesRoutes);


module.exports = app;