//* Imports
import UserSchema from '../models/userModel.js';
import passport from 'passport';

//! Route from users
//TODO: Route to login page
export const controllerSignIn = (_req, res) => {
  res.render('partials/users/signin');
};

export const controllerSignInAuth = passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true,
});

//TODO: Route to the registration page
export const controllerSignUp = (_req, res) => {
  res.render('partials/users/signup');
};

export const controllerSignUpPost = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ text: 'Please, Enter a name' });
  }
  if (!email) {
    errors.push({ text: 'Please, Enter a password' });
  }
  if (!password || password.length < 6) {
    errors.push({ text: 'The password entered is not valid.' });
  }
  if (password != confirm_password) {
    errors.push({ text: 'PassWord do not match' });
  }
  if (errors.length > 0) {
    res.render('partials/users/signup', {
      errors,
      name,
      email,
    });
  } else {
    const userFound = await UserSchema.findOne({ email: email });
    if (userFound) {
      req.flash('success_msg', 'The Email is already in use.');
      return res.redirect('/users/signup');
    }
    const userSave = UserSchema(req.body);
    userSave.password = await userSave.encryptPassword(password);
    await userSave.save();
    req.flash('success_msg', 'You are registered.');
    res.redirect('/users/signin');
  }
};

export const controllerLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect('/');
};
