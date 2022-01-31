import React from 'react';
import { ITask } from '@/interfaces';
import { TaskModalContent, OverlayStyle } from './styles';

import { useRouter } from 'next/router';
import TaskContent from './task-content';
import ReactModal from 'react-modal';

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
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="task-modal"
      overlayElement={(props, contentElement) => (
        <OverlayStyle {...props}>{contentElement}</OverlayStyle>
      )}
    >
      <TaskModalContent>
        <TaskContent task={task} />
      </TaskModalContent>
    </ReactModal>
  ) : null;
};

export default TaskModal;
