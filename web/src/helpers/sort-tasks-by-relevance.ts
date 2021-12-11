import { ITask } from '@/interfaces';

export function sortTasksByRelevance(tasks: ITask[]) {
  if (!tasks) return [];

  const sortedTasks = [...tasks].sort((a, b) => {
    // if (a.relevance == 100) console.log(a.title);
    // if (b.relevance == 100) console.log(b.title);

    if (a.relevance > b.relevance) {
      return -1;
    }

    let k1 = Boolean(a?.status) ? 0 : 1;
    let k2 = Boolean(b?.status) ? 0 : 2;

    return k1 - k2;
  });

  return sortedTasks;
}
