# Canvance web

```ts
const options = [
  { value: 'all', label: 'Todos' },
  { value: 'done', label: 'Completos' },
  { value: 'undone', label: 'Incompletos' },
] as const;

type optionsKeys = typeof options[number]['value'];\
type casesType = { [key in optionsKeys]: () => void };

const cases: casesType = {
  all: () => setListToShow(userTasks),
  done: () => setListToShow(finishedTasks),
  undone: () => setListToShow(notDoneTasks),
};
```
