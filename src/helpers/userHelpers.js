//* Imporst
import { validationResult } from 'express-validator';

export const validateResult = (req, res, next) => {
  //TODO: Si no tiene error para mostrar continua
  const { name, email } = req.body;
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    //TODO: Si tiene errores responde enviando un arreglo con los errores
    res.status(403);
    const errors = err.array();
    res.render('partials/users/signup', {
      errors,
      name,
      email,
    });
    console.log(errors);
  }
};
