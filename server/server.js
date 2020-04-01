const express = require('express');
const apiRouter = require('./routes');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id),
);

const users = [];

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.listen(process.env.PORT || '3000', () => {
  console.log(`Server running on port: ${process.env.PORT || '3000'}`);
});
