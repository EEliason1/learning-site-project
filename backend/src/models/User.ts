import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'Student' | 'Instructor' | 'Admin';
  mfaSecret?: string | null;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  isVerified?: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Instructor', 'Admin'], required: true },
  mfaSecret: { type: String, default: null },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model<IUser>('User', UserSchema);
