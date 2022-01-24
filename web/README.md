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
[x] um usuário pode ter mais de uma categoria

[] todos devem ter um gerente atrelado -> pensar no caso de deletarem o gerente

[] barra de progresso deve ser baseada na prioridade da tarefa
[] remover erro de login

[] resumo de tarefas finalizadas na página de minha conta
[] formulário de perguntas

- type (dissertativa ou questions)
- pergunta
- categoria
- step
- ordem
- questions

[] dois campos na tarefa - observação - campo obrigatório pra ele explicar que ele realmente fez - anexar arquivo

[] botão de inativar o usuário
