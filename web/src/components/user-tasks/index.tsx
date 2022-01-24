import { useEffect } from 'react';
import { useTaskList } from 'hooks/useTaskList';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import ListItem from './list-item';
import { Container, List } from './styles';
import TaskModal from './task-modal';

interface UserTasksProps {
  //...
}

const UserTasks: React.FC<UserTasksProps> = ({}) => {
  const { query } = useRouter();
  const { userTasks } = useTaskList();
  const { mutate } = useSWRConfig();

  if (!userTasks) return <div>Carregando...</div>;

  const selectedTask = userTasks.find((task) => task._id === query.selectedTask);

  useEffect(() => {
    mutate('/user/tasks');
  }, []);

  const sortedTasks = userTasks.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      if (a.status === 'done') return -1;

      return 1;
    }

    if (a.createdAt > b.createdAt) {
      if (b.status === 'done') return 1;

      return -1;
    }

    return 0;
  });

  return (
    <Container>
      {/*
        <div className="indicators-top">
          <div className="indicators-top_title">
              <Title>
                Indicadores - <strong>{user?.category.name || '...'}</strong>
              </Title>
          </div>
        </div>
      */}

      <List>
        {sortedTasks.map((task) => (
          <ListItem key={task._id} task={task} />
        ))}

        <TaskModal isOpen={!!query.selectedTask} task={selectedTask} />
      </List>
    </Container>
  );
};

export default UserTasks;
