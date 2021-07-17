import mongooose, { Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};

const userSchema = new mongooose.Schema<UserDocument>({
  firstName: {
    type: String,
    required: [true, 'A firstName must be provided']
  },
  lastName: {
    type: String,
    required: [true, 'A firstName must be provided']
  },
  email: {
    type: String,
    required: [true, 'An email must be provided'],
    unique: [true, 'Email already exist '],
    validate(value: string) {
      if (!validator.isEmail(value)) throw new Error('Enter a valid email');
    }
  },
  password: {
    type: String,
    required: [true, 'Enter a password'],
    minLength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashPassword = await bcrypt.hash(this.password, 8);
    this.password = hashPassword;
  }
  next();
});

userSchema.methods.getToken = function () {
  const token = jwt.sign(
    { email: this.email },
    process.env.JWT_STRING as string,
    {
      expiresIn: '1h'
    }
  );
  return token;
};

userSchema.methods.checkPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = mongooose.model('User', userSchema);

export default User;
