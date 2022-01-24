interface UserFormProps {
  name: string;
  email: string;
  category: string;
  manager?: string;
  permissionLevel: number | string;
}

interface TaskFormProps {
  title: string;
  description: string;
  relevance: string | number;
  category: string;
}

interface CategoryFormProps {
  name: string;
  description: string;
  priority: string;
}
