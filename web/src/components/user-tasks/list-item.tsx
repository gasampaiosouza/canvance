import { ITasks } from '@/interfaces';
import {
  ListItemContainer,
  ListItemIcon,
  ListItemText,
  CompletedIcon,
  UncompletedIcon,
} from './styles';

interface ListItemProps {
  task: ITasks;
}

const ListItem: React.FC<ListItemProps> = ({ task }) => {
  return (
    <ListItemContainer>
      <ListItemIcon>
        {task.completed ? <CompletedIcon /> : <UncompletedIcon />}
      </ListItemIcon>

      <ListItemText>{task.title}</ListItemText>
    </ListItemContainer>
  );
};

export default ListItem;
