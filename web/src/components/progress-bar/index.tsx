import { useTaskList } from 'hooks/useTaskList';
import { Container, FilledBar, InnerBar } from './styles';

const ProgressBar = () => {
  const { userTasks, finishedTasks } = useTaskList();

  console.log({ userTasks, heart: true });

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
