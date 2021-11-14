import { ITasks } from '@/interfaces';
import Loading from 'components/loading';
import { useAuth } from 'hooks/useAuth';
import { useTaskList } from 'hooks/useTaskList';
import ListItem from './list-item';
import { Container, List, Title } from './styles';

interface UserTasksProps {
  // preFetchedTasks: ITasks[];
}

const UserTasks: React.FC<UserTasksProps> = ({}) => {
  const { userTasks, addNewTask, removeTask } = useTaskList();
  const { user } = useAuth();

  console.log({ userTasks, color: 'blue' });

  // if (!preFetchedTasks) return <Loading />;

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
        {userTasks.map((task) => (
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
