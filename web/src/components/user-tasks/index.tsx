import { ITasks } from '@/interfaces';
import Loading from 'components/loading';
import { TasksContext } from 'contexts/TasksContext';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { ThemeContext } from 'styled-components';
import ListItem from './list-item';
import { Container, List, Title } from './styles';

const options = [
  { value: 'all', label: 'Todos' },
  { value: 'done', label: 'Completos' },
  { value: 'undone', label: 'Incompletos' },
] as const;

type optionsKeys = typeof options[number]['value'];

interface UserTasksProps {
  preFetchedTasks: ITasks[];
}

const UserTasks: React.FC<UserTasksProps> = ({ preFetchedTasks }) => {
  const { tasksList, tasksDone } = useContext(TasksContext);
  const [listToShow, setListToShow] =
    useState<typeof tasksList>(preFetchedTasks);
  const { colors, title } = useContext(ThemeContext);

  useEffect(() => {
    setListToShow(tasksList);
  }, [tasksList]);

  const handleListFilter = (value: optionsKeys) => {
    const notDoneTasks = tasksList.filter((task) => !task.completed);

    type casesType = { [key in optionsKeys]: () => void };

    const cases: casesType = {
      all: () => setListToShow(tasksList),
      done: () => setListToShow(tasksDone),
      undone: () => setListToShow(notDoneTasks),
    };

    return cases[value]();
  };

  if (!listToShow) return <Loading />;

  return (
    <Container>
      <div className="indicators-top">
        <Title>Todos os indicadores</Title>

        <Select
          onChange={(e) => handleListFilter(e!.value)}
          placeholder="Filtrar indicadores"
          options={options}
          styles={{
            option: (provided) => ({
              ...provided,
              color: title == 'light' ? colors.text : colors.white,
            }),
            // control: (provided) => ({ ...provided, color: colors.text }),
            // singleValue: (provided) => ({ ...provided, color: colors.text }),
            container: (base) => ({ ...base, width: 250 }),
          }}
        />
      </div>

      <List>
        {listToShow.map((task) => (
          <ListItem key={task.id} task={task} />
        ))}
      </List>
    </Container>
  );
};

export default UserTasks;
