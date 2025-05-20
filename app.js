// app.js
const express = require('express');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();
const session = require('express-session');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true } // cookie tylko dla serwera
}));

// Middleware
app.use(helmet({
  contentSecurityPolicy: false // lub skonfiguruj jak wcześniej
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Routing
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Serwer
app.listen(3002, () => {
  console.log('Server is working on port 3002');
});
