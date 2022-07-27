//* Imports
import { Router } from 'express';
import {
  controllerCreateNote,
  controllerDeleteNote,
  controllerNewNote,
  controllerSaveNote,
  controllerUpdateNote,
  controllerViewNotes,
} from '../controllers/notesContoller.js';
import authHelpers from '../helpers/authHelpers.js';
import { validateCreateNote } from '../validator/notesValidator.js';
//* Initialization
const notesRoutes = Router();
//! Routes note
//TODO: route create note
notesRoutes.get(
  '/notes/add',
  authHelpers.isAuthenticated,
  controllerCreateNote
);
//TODO: Path to save notes post method
notesRoutes.post(
  '/notes/new-notes',
  authHelpers.isAuthenticated,
  validateCreateNote,
  controllerNewNote
);
//TODO: Route controller to view notes
notesRoutes.get('/notes', authHelpers.isAuthenticated, controllerViewNotes);
//TODO: Route controller for note updates
notesRoutes.get(
  '/notes/:id/edit',
  authHelpers.isAuthenticated,
  controllerUpdateNote
);
//TODO: Route controller for note update put method
notesRoutes.put(
  '/notes/:id/edit-note',
  authHelpers.isAuthenticated,
  controllerSaveNote
);
//TODO: Route controller for note remove delete method
notesRoutes.delete(
  '/notes/:id/delete',
  authHelpers.isAuthenticated,
  controllerDeleteNote
);

//TODO: Exports
export default notesRoutes;
