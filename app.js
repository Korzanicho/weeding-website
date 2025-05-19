// app.js
const express = require('express');
const app = express();

// Ustawienie silnika szablonów na EJS
app.set('view engine', 'ejs');

// Middleware dla plików statycznych (CSS)
app.use(express.static('public'));

// Route dla strony głównej
app.get('/', (req, res) => {
  res.render('index', { title: 'Adrian & Klaudia' });
});

// Route dla strony "O nas"
app.get('/history', (req, res) => {
  res.render('history', { title: 'O nas' });
});

// Nasłuchujemy na porcie 3000
app.listen(3002, () => {
  console.log('Server is working on port 3002');
});
