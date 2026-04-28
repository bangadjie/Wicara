require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/auth', require('./src/routes/auth'));

app.get('/', (req, res) => {
  res.send('testing server wok');
});

app.listen(3000, () => {
  console.log('Server running di http://localhost:3000');
});