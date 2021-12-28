import { ITask } from '@/interfaces';
import { useTaskList } from 'hooks/useTaskList';
import {
  CompletedIcon,
  ListItemContainer,
  ListItemIcon,
  ListItemText,
  UncompletedIcon,
} from './styles';

interface ListItemProps {
  task: ITask;
}

const ListItem: React.FC<ListItemProps> = ({ task }) => {
  const { addNewTask, removeTask } = useTaskList();

  const handleTaskClick = async (taskId: string) => {
    if (task?.status === 'done') {
      removeTask(taskId);
      return;
    }

    addNewTask(taskId);
  };

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
