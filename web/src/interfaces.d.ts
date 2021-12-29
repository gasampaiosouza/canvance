export interface ICategory {
  _id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  category: ICategory;
  permissionLevel: 1 | 2 | 3;
  createdAt: string;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  relevance: number;
  category: ICategory;
  status?: 'done' | 'ongoing' | null;
  createdAt: string;
}

export interface ITaskDone {
  _id: string;
  newTask: ITask;
  userId: string;
  status: string;
  createdAt: string;
}
