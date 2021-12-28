import { useTaskList } from 'hooks/useTaskList';
import { Container, FilledBar, InnerBar } from './styles';

const ProgressBar = () => {
  const { userTasks } = useTaskList();
  const finishedTasks = userTasks.filter((task) => task.status === 'done');

  let percentage = (finishedTasks.length * 100) / userTasks.length;

  // remove unnecessary width
  if (percentage > 100) percentage = 100;

  const title_data = `${finishedTasks.length}/${userTasks.length}`;

  return (
    <Container>
      <InnerBar title={`${title_data} tarefas concluídas`}>
        <FilledBar width={`${percentage || 0}%`} />
      </InnerBar>
    </Container>
  );
};

export default ProgressBar;
