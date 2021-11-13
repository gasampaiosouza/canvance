import bcrypt from 'bcryptjs';
import mongoose, { ObjectId } from 'mongoose';

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;

  category: ObjectId;

  permissionLevel: number;
  passwordResetToken: string;
  passwordResetExpires: Date;

  createdAt: Date | number;
}

const UserSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false, required: true },
  permissionLevel: { type: Number, required: true },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },

  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
