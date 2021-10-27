import { ITasks } from '@/interfaces';
import { useCallback } from 'react';
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
  const handleTaskClick = useCallback((taskId: string) => {
    console.log(taskId);
  }, []);

  return (
    <ListItemContainer onClick={() => handleTaskClick(task._id)}>
      <ListItemIcon>
        {task.status == 'done' ? <CompletedIcon /> : <UncompletedIcon />}
      </ListItemIcon>

      <ListItemText>{task.title}</ListItemText>

      {/* {task.status == 'done' && <CompleteTaskButton></CompleteTaskButton>} */}
    </ListItemContainer>
  );
};

export default ListItem;
