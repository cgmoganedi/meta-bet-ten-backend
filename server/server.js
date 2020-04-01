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
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkAuthenticated, (req, res, next) => {
  res.render('index.ejs', { name: req.user.first_name });
});

app.get('/login', checkNotAuthenticated, (req, res, next) => {
  res.render('login.ejs');
});
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res, next) => {
  res.render('register.ejs');
});
app.post('/register', checkNotAuthenticated, async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      star_sign: req.body.star_sign,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
});

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
})

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/');
  }
  next();
}

app.use('/api', apiRouter);

app.listen(process.env.PORT || '3000', () => {
  console.log(`Server running on port: ${process.env.PORT || '3000'}`);
});
