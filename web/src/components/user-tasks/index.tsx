import { useAuth } from 'hooks/useAuth';
import { useTaskList } from 'hooks/useTaskList';
import ListItem from './list-item';
import { Container, List, Title } from './styles';

interface UserTasksProps {
  //...
}

const UserTasks: React.FC<UserTasksProps> = ({}) => {
  const { userTasks, addNewTask, removeTask } = useTaskList();
  const { user } = useAuth();

  const sortedTasksByDone = [...userTasks].sort((a, b) => {
    if (a.status === 'done' && b.status !== 'done') return -1;
    if (a.status !== 'done' && b.status === 'done') return 1;

    return 0;
  });

  return (
    <Container>
      <div className="indicators-top">
        <div className="indicators-top_title">
          <Title>
            Indicadores - <strong>{user?.category.name || '...'}</strong>
          </Title>
        </div>
      </div>

      <List>
        {sortedTasksByDone.map((task) => (
          <ListItem
            key={task._id}
            task={task}
            addNewTask={addNewTask}
            removeTask={removeTask}
          />
        ))}
      </List>
    </Container>
  );
};

export default UserTasks;
