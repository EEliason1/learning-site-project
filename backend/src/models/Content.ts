import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  title: string;
  type: 'video' | 'article' | 'quiz';
  url?: string;
  text?: string;
  course: mongoose.Types.ObjectId;
}

const ContentSchema = new Schema<IContent>({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'article', 'quiz'], required: true },
  url: { type: String },
  text: { type: String },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
});

export default mongoose.model<IContent>('Content', ContentSchema);
