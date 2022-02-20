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
[x] todos devem ter um gerente atrelado -> pensar no caso de deletarem o gerente
[x] barra de progresso deve ser baseada na prioridade da tarefa
[x] remover erro de login

[x] dois campos na tarefa - observação - campo obrigatório pra ele explicar que ele realmente fez - anexar arquivo

[x] formulário de perguntas

- type (dissertativa ou questions)
- pergunta
- categoria
- ordem
- questions

[] como se fosse um jogo

[x] botão de inativar o usuário

[] pesquisa de usuário, categoria e tarefa
[x] resumo de tarefas finalizadas na página de minha conta
