import { ITasks } from '@/interfaces';
import Loading from 'components/loading';
import { useAuth } from 'hooks/useAuth';
import ListItem from './list-item';
import { Container, List, Title } from './styles';

interface UserTasksProps {
  preFetchedTasks: ITasks[];
}

const UserTasks: React.FC<UserTasksProps> = ({ preFetchedTasks }) => {
  const { user } = useAuth();

  if (!preFetchedTasks) return <Loading />;

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
        {preFetchedTasks.map((task) => (
          <ListItem key={task._id} task={task} />
        ))}
      </List>
    </Container>
  );
};

export default UserTasks;
