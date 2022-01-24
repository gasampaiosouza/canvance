import mongoose, { ObjectId } from 'mongoose';

export interface TaskDocument extends mongoose.Document {
  title: string;
  description: string;
  relevance: number;

  category: ObjectId[];

  createdAt: Date | number;
}

const TaskSchema = new mongoose.Schema<TaskDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  relevance: { type: Number, required: true },

  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
