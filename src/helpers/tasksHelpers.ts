import { ITask } from '../types';

type SplitTasks = {
  userTasks: ITask[];
  backlogTasks: ITask[];
};
export function splitTasks(tasks: ITask[]): SplitTasks {
  const userTasks: ITask[] = [];
  const backlogTasks: ITask[] = [];

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].executor) {
      userTasks.push(tasks[i]);
    } else {
      backlogTasks.push(tasks[i]);
    }
  }

  return { userTasks, backlogTasks };
}

export function filter(tasks: ITask[], text: string): ITask[] {
  return tasks.filter(
    (task) =>
      task.subject.toLowerCase().includes(text) ||
      task.description.toLowerCase().includes(text)
  );
}
