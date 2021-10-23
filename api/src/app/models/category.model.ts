import mongoose from 'mongoose';
import { TaskDocument } from './task.model';

export interface CategoryDocument extends mongoose.Document {
  name: string;
  description: string;
  priority: string;
  // tasks: TaskDocument[];

  createdAt: Date | number;
}

const CategorySchema = new mongoose.Schema<CategoryDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  // tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],

  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model<CategoryDocument>('Category', CategorySchema);

export default Category;
