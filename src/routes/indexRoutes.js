//* Imports
import { Router } from 'express';
import {
  controllerAbout,
  controllerHome,
} from '../controllers/indexController.js';

//* Initialization
const indexRoutes = Router();

//TODO: Route main
indexRoutes.get('/', controllerHome);

//TODO: Route to about page
indexRoutes.get('/about', controllerAbout);

//! Exports
export default indexRoutes;
