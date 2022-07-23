import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//! Encryted password
userSchema.methods.encryptPassword = async (password) => {
  //* We use bcryjs to encrypt 10 times
  //* We return the encrypted password
  return bcrypt.hash(password, 10);
};

//! Compare password with entered password
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('UserSchema', userSchema);
