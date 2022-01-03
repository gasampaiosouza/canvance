import { ITask } from '@/interfaces';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import TaskContent from 'components/user-tasks/task-content';
import { useTaskList } from 'hooks/useTaskList';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Content } from 'styles/dashboard-styles';

const TaskPage = () => {
  const { query, asPath } = useRouter();
  const { userTasks } = useTaskList();

  const selectedTask = userTasks.find((task) => task._id === query.taskId);

  const breadcrumb = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Visualizar tarefa', href: asPath },
  ];

  return (
    <>
      <Head>
        <title>Canvance - Visualizar tarefa</title>
      </Head>

      <Container>
        <Header title="Visualizar tarefa" breadcrumb={breadcrumb} />

        <Content>
          <TaskContent task={selectedTask as ITask} />
        </Content>

        <Sidebar />
      </Container>
    </>
  );
};

export default TaskPage;
