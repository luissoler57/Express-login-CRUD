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
import helpers from '../helpers/auth.js';
//* Initialization
const notesRoutes = Router();

//! Routes note
//TODO: route create note
notesRoutes.get('/notes/add', helpers.isAuthenticated, controllerCreateNote);
//TODO: Path to save notes post method
notesRoutes.post(
  '/notes/new-notes',
  helpers.isAuthenticated,
  controllerNewNote
);
//TODO: Route controller to view notes
notesRoutes.get('/notes', helpers.isAuthenticated, controllerViewNotes);
//TODO: Route controller for note updates
notesRoutes.get(
  '/notes/:id/edit',
  helpers.isAuthenticated,
  controllerUpdateNote
);
//TODO: Route controller for note update put method
notesRoutes.put(
  '/notes/:id/edit-note',
  helpers.isAuthenticated,
  controllerSaveNote
);
//TODO: Route controller for note remove delete method
notesRoutes.delete(
  '/notes/:id/delete',
  helpers.isAuthenticated,
  controllerDeleteNote
);

//TODO: Exports
export default notesRoutes;
