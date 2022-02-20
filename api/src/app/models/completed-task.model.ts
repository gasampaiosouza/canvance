import mongoose, { ObjectId } from 'mongoose';

export interface CompletedTaskDocument extends mongoose.Document {
  newTask: ObjectId | string;
  user: ObjectId | string;
  status: string;

  createdAt: Date | number;

  observation: string;
  file?: string;
}

const CompletedTaskSchema = new mongoose.Schema<CompletedTaskDocument>({
  newTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  status: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },

  observation: { type: String, required: true },
  file: { type: String },
});

const CompletedTask = mongoose.model<CompletedTaskDocument>('completed-task', CompletedTaskSchema);

export default CompletedTask;
