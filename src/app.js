// * Imports modules
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
//* Imports routes
import indexRoutes from './routes/indexRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
//* Imports Authentication
import './config/passport.js';

// * Initialization
const app = express();
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

//! Setting
app.set('port', process.env.PORT);
app.set('views', join(__dirname, 'views'));
app.engine(
  '.hbs',
  engine({
    layoutsDir: join(app.get('views'), 'layouts'),
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');

//! Midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//TODO: Process requets from the browser
app.use(methodOverride('_method'));
//TODO: Saving data in the session
app.use(
  session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
  })
);
//TODO: Passport
app.use(passport.initialize());
app.use(passport.session());
//TODO: Flash Message
app.use(flash());

//! Global Variables
//TODO: Flash Message
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.erros_msg = req.flash('errors_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  next();
});

//! Routes
app.use(indexRoutes);
app.use(notesRoutes);
app.use(usersRoutes);

//! Static Files
app.use(express.static(join(__dirname, 'public')));

// TODO: Exports
export default app;
