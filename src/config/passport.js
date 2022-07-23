//* Imports
import passport from 'passport';
import Strategy from 'passport-local';
import UserSchema from '../models/userModel.js';

//*Initialization
const localStrategy = Strategy;

//! Definimos la estrategia de autenticacion
passport.use(
  new localStrategy(
    {
      //* Le pasamos el campo a validar
      usernameField: 'email',
    },
    async (email, password, done) => {
      //TODO: Utilizamos el modelo de la base de datos para buscar si se encuentra registrado el correo
      const user = await UserSchema.findOne({
        email: email,
      });
      //* Si no se encuentra el usuario
      if (!user) {
        //* Se retorna
        //* Primer valor se utiliza para retorna un error, 'null' para indicar que no hay errores
        //* Segundo valor (true o false), en este caso false
        //* Adicional a un mensaje
        return done(null, false, { message: 'Not user found' });
      } else {
        //* Si se encuentra el usuario, validamos que coincida con la password guardada
        //* Con el metodo creado para comparar la password cifrada

        const match = await user.matchPassword(password);
        //* Si coinciden,
        if (match) {
          //*  no retornamos errores (null), y el usuario encontrado con la password
          return done(null, user);
        } else {
          //* Si el password ingresado no coincide
          //* No retornamos errores (null)
          //* retornamos (false) ya que no se encontraron usuarios
          return done(null, false, { message: 'Incorrect Password' });
        }
      }
    }
  )
);

//! Utizalimos el metodo seriallizeUser de passport
//* Le pasamos el usuario (user)
//* y tambien un callback (done)
passport.serializeUser((user, done) => {
  //* le pasamos el primero parametros (null) porque no tiene errores
  //* y le pasamos el id del usuario, para evitar que se logee nuevametne
  done(null, user.id);
});

//! Utilizamos el metodo deserializeUser de passport
//* Le pasamos un id del usuario
//* y tambien un callback (done)
passport.deserializeUser((id, done) => {
  UserSchema.findById(id, (err, user) => {
    done(err, user);
  });
});
