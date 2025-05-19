// app.js
const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false // lub skonfiguruj jak wcześniej
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routing
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Serwer
app.listen(3002, () => {
  console.log('Server is working on port 3002');
});
