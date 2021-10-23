export interface IUser {
  name: string;
  email: string;
  permissionLevel: 1 | 2 | 3;
  createdAt: string;
}

export interface ITasks {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  // title: string;
  // relevance: string;
  // completed: boolean;
}
