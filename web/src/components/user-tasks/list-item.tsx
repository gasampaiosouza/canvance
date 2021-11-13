import { ITaskDone, ITasks } from '@/interfaces';
import { useAuth } from 'hooks/useAuth';
import { omit } from 'lodash';
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from 'services/api';
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
  const [currentTask, setCurrentTask] = useState<ITasks>(task);
  const { user } = useAuth();

  const handleTaskClick = async (taskId: string) => {
    if (currentTask?.status === 'done') {
      try {
        const response = await api.delete(`/tasks-done/${taskId}`);

        setCurrentTask(omit(currentTask, 'status'));

        toast.success('Tarefa desfeita!');
      } catch (error) {
        toast.error('Ocorreu um erro ao tentar desfazer a tarefa');
      }

      return;
    }

    try {
      const { data } = await api.post<ITaskDone>('/tasks-done', {
        taskId,
        userId: user?._id,
        status: 'done',
      });

      setCurrentTask({ ...currentTask, status: 'done' });

      toast.success('Tarefa finalizada!');
    } catch (error) {
      toast.error('Ocorreu um erro ao finalizar a tarefa.');
      console.log(error);
    }
  };

  return (
    <ListItemContainer onClick={() => handleTaskClick(currentTask._id)}>
      <ListItemIcon>
        {currentTask.status == 'done' ? <CompletedIcon /> : <UncompletedIcon />}
      </ListItemIcon>

      <ListItemText>{currentTask.title}</ListItemText>

      {/* {task.status == 'done' && <CompleteTaskButton></CompleteTaskButton>} */}
    </ListItemContainer>
  );
};

export default ListItem;
