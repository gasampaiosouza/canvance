import { TasksContext } from 'contexts/TasksContext';
import { useContext } from 'react';

import { Container, FilledBar, InnerBar } from './styles';

const ProgressBar = () => {
  const { tasksList } = useContext(TasksContext);

  const tasksDone = tasksList.filter((task) => task.completed);

  let percentage = (tasksDone.length * 100) / tasksList.length;

  // remove unnecessary width
  if (percentage > 100) percentage = 100;

  const title_data = `${tasksDone.length}/${tasksList.length}`;

  return (
    <Container>
      <InnerBar title={`${title_data} tarefas concluídas`}>
        <FilledBar width={`${percentage || 0}%`} />
      </InnerBar>
    </Container>
  );
};

export default ProgressBar;
