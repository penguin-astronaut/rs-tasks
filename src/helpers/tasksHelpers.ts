import { ITask, IUser } from '../types';

type JoinTasksToUsers = {
  usersWithTasks: IUser[];
  backlogTasks: ITask[];
};
export function joinTasksToUsers(
  tasks: ITask[],
  users: IUser[]
): JoinTasksToUsers {
  const backlogTasks: ITask[] = [];
  const usersWithTasks = [...users];

  usersWithTasks.map((user) => {
    user.tasks = [];
    return user;
  });

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].executor) {
      const userIndex = usersWithTasks.findIndex(
        (user) => tasks[i].executor === user.id
      );

      if (userIndex !== -1) {
        usersWithTasks[userIndex].tasks?.push(tasks[i]);
      }
    } else {
      backlogTasks.push(tasks[i]);
    }
  }

  return { usersWithTasks, backlogTasks };
}

export function filter(tasks: ITask[], text: string): ITask[] {
  return tasks.filter(
    (task) =>
      task.subject.toLowerCase().includes(text) ||
      task.description.toLowerCase().includes(text)
  );
}
