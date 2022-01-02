import mongoose from 'mongoose';

// 1. Você se considera uma pessoa legal?

// essas abaixo são as opções de respostas - interface Question
// [ ] Sim
// [ ] Não
// [ ] Não sei responder

interface Question {
  label: string;
}

export interface QuestionDocument extends mongoose.Document {
  title: string;
  questions?: Question[];
}

const CategorySchema = new mongoose.Schema<QuestionDocument>({
  title: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

const Category = mongoose.model<QuestionDocument>('Category', CategorySchema);

export default Category;
