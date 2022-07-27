import { validationResult } from 'express-validator';

export const validateResultNotes = (req, res, next) => {
  const { title, description } = req.body;
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403);
    const errors = err.array();
    res.render('partials/notes/new-notes', {
      errors,
      title,
      description,
    });
  }
};
