import mongoose from 'mongoose';

export interface QuestionDocument extends mongoose.Document {
  type: 'essay' | 'multiple';
  category: mongoose.Types.ObjectId;
  label: string;
  order: number;
  answers: string[];
}

const QuestionSchema = new mongoose.Schema<QuestionDocument>({
  type: { type: String, enum: ['essay', 'multiple'], required: true },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  ],
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
  answers: { type: [String], required: true },
});

const Question = mongoose.model<QuestionDocument>('Question', QuestionSchema);

export default Question;
