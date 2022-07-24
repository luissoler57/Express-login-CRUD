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
  const { password } = req.body;
  const userSave = UserSchema(req.body);
  userSave.password = await userSave.encryptPassword(password);
  await userSave.save();
  req.flash('success_msg', 'You are registered.');
  res.redirect('/users/signin');
};

export const controllerLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect('/');
};
