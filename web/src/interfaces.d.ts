export interface IUser {
  _id: string;
  name: string;
  email: string;
  category: {
    _id: string;
    name: string;
    description: string;
    priority: string;
  };
  permissionLevel: 1 | 2 | 3;
  createdAt: string;
}

export interface ITasks {
  _id: string;
  title: string;
  description: string;
  relevance: number;
  status: 'done' | 'ongoing' | null;
  createdAt: string;
}
