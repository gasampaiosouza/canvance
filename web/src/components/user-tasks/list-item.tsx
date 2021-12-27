import { ITask } from '@/interfaces';
import { toast } from 'react-toastify';
import {
  CompletedIcon,
  ListItemContainer,
  ListItemIcon,
  ListItemText,
  UncompletedIcon,
} from './styles';

interface ListItemProps {
  task: ITask;
  addNewTask: (taskId: string) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
}

const ListItem: React.FC<ListItemProps> = ({ task, addNewTask, removeTask }) => {
  // const { addNewTask, removeTask } = useTaskList();

  const handleTaskClick = async (taskId: string) => {
    if (task?.status === 'done') {
      try {
        await removeTask(taskId);
        toast.success('Tarefa desfeita!');

        return;
      } catch (error) {
        console.log(error);
        toast.error('Ocorreu um erro ao desfazer a tarefa!');
      }
    }

    try {
      await addNewTask(taskId);
      toast.success('Tarefa finalizada!');
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro ao finalizar a tarefa.');
    }
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
