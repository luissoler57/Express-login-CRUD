import { check } from 'express-validator';
import { validateResultNotes } from '../helpers/notesHelpers.js';

export const validateCreateNote = [
  check('title', 'Enter a correct title')
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage('The title Minimun 5 characters'),
  check('description', 'Enter a correct description')
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 20, max: 300 })
    .withMessage(
      'The description Minimun 20 characters and maximun 300 characters'
    ),
  (req, res, next) => {
    console.log(validateCreateNote);
    validateResultNotes(req, res, next);
  },
];
