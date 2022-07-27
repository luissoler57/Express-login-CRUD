import { check } from 'express-validator';
import { validateResult } from '../helpers/userHelpers.js';
import UserSchema from '../models/userModel.js';

export const validateCreate = [
  check('name', 'Enter a correct name')
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage('The name must contain at least 5 characters'),
  check('email', 'Enter a correct email ad  dress')
    .exists()
    .isEmail()
    .custom(async (email) => {
      const existingUser = await UserSchema.findOne({ email });
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }),

  check('password')
    .trim()
    .isLength({ min: 4, max: 16 })
    // Custom message
    .withMessage('Password must be between 4 to 16 characters')
    .custom(async (password, { req }) => {
      const confirm_password = req.body.confirm_password;
      // If password and confirm password not same
      // don't allow to sign up and throw error
      if (password !== confirm_password) {
        throw new Error('Passwords must be same');
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
