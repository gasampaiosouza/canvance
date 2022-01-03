import { ITask } from '@/interfaces';
import {
  CompletedIcon,
  ListItemContainer,
  ListItemIcon,
  ListItemText,
  UncompletedIcon,
} from './styles';

import Link from 'next/link';

interface ListItemProps {
  task: ITask;
}

const ListItem: React.FC<ListItemProps> = ({ task }) => {
  return (
    <Link
      href={`/dashboard?selectedTask=${task._id}`}
      as={`/dashboard/task?taskId=${task._id}`}
    >
      <ListItemContainer>
        <ListItemIcon>
          {task.status == 'done' ? <CompletedIcon /> : <UncompletedIcon />}
        </ListItemIcon>

        <ListItemText>{task.title}</ListItemText>
      </ListItemContainer>
    </Link>
  );
};

export default ListItem;
