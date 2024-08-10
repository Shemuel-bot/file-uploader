const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bycrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const {body, validationResult} = require('express-validator');
const prisma = new PrismaClient();


exports.log_in_post = asyncHandler(passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
}));

exports.log_in_get = function(req, res, next) {
    res.render('log_in', {
      title: 'Log In',
    })
}

exports.sign_up_post = [
    body('username', 'username must not be empty')
      .trim()
      .isLength({ min: 1})
      .escape(),
    body('password', 'password must not be empty')
      .trim()
      .isLength({ min: 1})
      .escape(),
    asyncHandler(async (req, res) => {
      const password = await bycrypt.hash(req.body.password, 10)
                  .then(hash => hash)
                  .catch(err => {console.log(err.message)});
      await prisma.user.create({
        data: {
          name: req.body.username,
          password: password,
        }
      });
      res.redirect('/');
    })
]
passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const rows = await prisma.user.findUnique({
            where:{
                name: username,
            }
        });
        if (!rows) {
          return done(null, false, { message: "Incorrect username" });
        };
        const match = await bycrypt.compare(password, rows.password);
  if (!match) {
    // passwords do not match!
    return done(null, false, { message: "Incorrect password" })
  }
  
        return done(null, rows);
      } catch(err) {
        return done(err);
      };
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const rows = await prisma.user.findUnique({
        where:{
            id: id,
        }
      });

      done(null, rows);
    } catch(err) {
      done(err);
    };
  });
  
  