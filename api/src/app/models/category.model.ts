import mongoose from 'mongoose';

export interface CategoryDocument extends mongoose.Document {
  name: string;
  description: string;
  priority: string;

  createdAt: Date | number;
}

const CategorySchema = new mongoose.Schema<CategoryDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model<CategoryDocument>('Category', CategorySchema);

export default Category;
