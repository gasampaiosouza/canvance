import { useTaskList } from 'hooks/useTaskList';
import { Container, FilledBar, InnerBar } from './styles';

const ProgressBar = () => {
  const { userTasks } = useTaskList();
  const finishedTasks = userTasks?.filter((task) => task.status === 'done');

  const relevanceTotal = userTasks?.reduce((acc, task) => acc + task.relevance, 0);
  const completedTasksRelevance = finishedTasks?.reduce(
    (acc, task) => acc + task.relevance,
    0
  );

  let percentage = (completedTasksRelevance * 100) / relevanceTotal;

  // remove unnecessary width
  if (percentage > 100) percentage = 100;

  const title_data = `${completedTasksRelevance}/${relevanceTotal}`;

  return (
    <Container>
      <InnerBar title={title_data}>
        <FilledBar width={`${percentage || 0}%`} />
      </InnerBar>
    </Container>
  );
};

export default ProgressBar;
