import mongoose, { ObjectId } from 'mongoose';

export interface CompletedTaskDocument extends mongoose.Document {
  taskId: ObjectId | string;
  userId: ObjectId | string;
  status: string;

  createdAt: Date | number;
}

const CompletedTaskSchema = new mongoose.Schema<CompletedTaskDocument>({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  status: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const CompletedTask = mongoose.model<CompletedTaskDocument>(
  'completed-task',
  CompletedTaskSchema
);

export default CompletedTask;
