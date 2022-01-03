import React from 'react';
import { ITask } from '@/interfaces';
import { TaskModalContainer, TaskModalOverlay, TaskModalContent } from './styles';

import { useRouter } from 'next/router';
import TaskContent from './task-content';

interface TaskModalProps {
  isOpen: boolean;
  task?: ITask;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, task }) => {
  const router = useRouter();

  function closeModal() {
    router.push('/dashboard');
  }

  return task ? (
    <TaskModalContainer isOpen={isOpen}>
      <TaskModalOverlay onClick={closeModal} />

      <TaskModalContent>
        <TaskContent task={task} />
      </TaskModalContent>
    </TaskModalContainer>
  ) : null;
};

export default TaskModal;
