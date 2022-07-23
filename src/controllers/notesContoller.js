//* Imports
import NoteSchema from '../models/noteModel.js';

//! Route from notes
//TODO: Route controller from page create note
export const controllerCreateNote = (_req, res) => {
  res.render('partials/notes/new-notes');
};

//TODO: Route to save notes
export const controllerNewNote = async (req, res) => {
  const { title, description } = req.body;
  // ! Manejo de errores
  const errors = [];
  //* Si el campo titulo esta vacio muestra un mensaje de error
  if (!title) {
    errors.push({ text: 'Please, Write a title' });
  }
  //* Si el campo descripcion esta vacio muestra un mensaje de error
  if (!description) {
    errors.push({ text: 'Please, Write a Description' });
  }
  //* Si el arreglo de 'errors' tiene errores, renderiza nuevamente la pagina con los errores
  if (errors.length > 0) {
    res.render('partials/notes/new-notes', {
      errors,
      title,
      description,
    });
  } else {
    //* Guardamos la nota y validamos errores
    try {
      const newNote = new NoteSchema(req.body);
      newNote.user = req.user.id;
      await newNote.save();
      req.flash('success_msg', 'Note added Successfully');
      res.redirect('/notes/');
    } catch (E11000) {
      errors.push({ text: 'Please, Note duplicate' });
      res.render('partials/notes/new-notes', {
        errors,
        title,
        description,
      });
    }
  }
};
//TODO: Route controller to view notes
export const controllerViewNotes = async (req, res) => {
  const notesSee = await NoteSchema.find({ user: req.user.id })
    .lean()
    .sort({ date: 'desc' });
  res.render('partials/notes/all-notes', { notesSee });
};

//TODO: Route controller for note updates
export const controllerUpdateNote = async (req, res) => {
  const { id } = req.params;
  const viewNote = await NoteSchema.findById(id).lean();
  res.render('partials/notes/edit-note', { viewNote });
};

//TODO: Route controller for note update put method
export const controllerSaveNote = async (req, res) => {
  const { id } = req.params;
  const viewNote = await NoteSchema.findById(id).lean();
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: 'Please, Write a tile' });
  }
  if (!description) {
    errors.push({ text: 'Please, Write a description' });
  }
  if (errors.length > 0) {
    res.render('partials/notes/edit-note', {
      errors,
      viewNote,
    });
  } else {
    try {
      await NoteSchema.findByIdAndUpdate(id, req.body);
      req.flash('success_msg', 'Note Updated Succesfully');
      res.redirect('/notes');
    } catch (E11000) {
      errors.push({ text: 'The note is duplicate' });
      res.render('partials/notes/edit-note', {
        errors,
        viewNote,
      });
    }
  }
};
//TODO: Route controller for note remove delete method
export const controllerDeleteNote = async (req, res) => {
  const { id } = req.params;
  await NoteSchema.findByIdAndDelete(id);
  req.flash('success_msg', 'Note Delete Successfully');
  res.redirect('/notes');
};
