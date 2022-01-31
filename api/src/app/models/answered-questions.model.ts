import mongoose from 'mongoose';

export interface AnsweredQuestionDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  questions: { question: mongoose.Types.ObjectId; answer: string }[];
}

const AnsweredQuestionSchema = new mongoose.Schema<AnsweredQuestionDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: {
    required: true,
    type: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
          required: true,
        },
        answer: { type: String, required: true },
      },
    ],
  },
});

const AnsweredQuestion = mongoose.model<AnsweredQuestionDocument>(
  'answered-question',
  AnsweredQuestionSchema
);

export default AnsweredQuestion;
