//* Imports
import mongoose from 'mongoose';
import { config } from 'dotenv';

//* Initialization
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@nodejs.b2yzi.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;

//! Connection DB
(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connetion', process.env.NAME_DB);
  } catch (error) {
    console.log(error);
  }
})();
