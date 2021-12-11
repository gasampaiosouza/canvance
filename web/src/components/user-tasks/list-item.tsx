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

    //   try {
    //     const response = await api.delete(`/tasks-done/${taskId}`);

    //     setCurrentTask(omit(currentTask, 'status'));

    //     toast.success('Tarefa desfeita!');
    //   } catch (error) {
    //     toast.error('Ocorreu um erro ao tentar desfazer a tarefa');
    //   }

    //   return;
    // }

    // try {
    //   const { data } = await api.post<ITaskDone>('/tasks-done', {
    //     taskId,
    //     userId: user?._id,
    //     status: 'done',
    //   });

    //   setCurrentTask({ ...currentTask, status: 'done' });

    //   toast.success('Tarefa finalizada!');
    // } catch (error) {
    //   toast.error('Ocorreu um erro ao finalizar a tarefa.');
    //   console.log(error);
    // }
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
