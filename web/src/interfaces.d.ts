export interface ICategory {
  _id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface IUser {
  _id: string;
  active: boolean;
  name: string;
  email: string;
  category: ICategory[];
  permissionLevel: 1 | 2 | 3;
  createdAt: string;
  manager?: IUser;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  relevance: number;
  category: ICategory[];
  status?: 'done' | 'ongoing' | null;
  createdAt: string;
}

export interface ITaskDone {
  _id: string;
  newTask: ITask;
  observation: string;
  userId: string;
  status: string;
  createdAt: string;
}

export interface IQuestion {
  _id?: string;
  type: 'essay' | 'multiple';
  category: ICategory[];
  label: string;
  order: number;
  answers: string[] | [];
}

export interface IQuestionAnswered {
  _id?: string;
  user: string;
  questions: { _id?: string; question: IQuestion; answer: string }[];
}
