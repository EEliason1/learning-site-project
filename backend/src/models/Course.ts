import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: mongoose.Types.ObjectId;
  content: mongoose.Types.ObjectId[];
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: [{ type: Schema.Types.ObjectId, ref: 'Content' }],
});

export default mongoose.model<ICourse>('Course', CourseSchema);
