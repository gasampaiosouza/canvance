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

## Todo

[x] Trocar as categorias na edição e criação de tasks pro hook
[x] Colocar label /\
[x] resetar a senha
[] resumo de tarefas finalizadas na página de minha conta
[] formulário de perguntas
