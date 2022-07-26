//* Imports
import { Router } from 'express';
import {
  controllerLogout,
  controllerSignIn,
  controllerSignInAuth,
  controllerSignUp,
  controllerSignUpPost,
} from '../controllers/usersController.js';
import { validateCreate } from '../validator/userValidator.js';

//* Initialization
const usersRoutes = Router();

//! User Sign In
usersRoutes.get('/users/signin', controllerSignIn);
usersRoutes.post('/users/signin', controllerSignInAuth);

//! User Sign Up
usersRoutes.get('/users/signup', controllerSignUp);
usersRoutes.post('/users/signup', validateCreate, controllerSignUpPost);

//! User Logout
usersRoutes.get('/users/logout', controllerLogout);

//TODO: Exports
export default usersRoutes;
