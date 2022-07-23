//* Imports
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//*Exports
export default mongoose.model('NoteSchema', noteSchema);
