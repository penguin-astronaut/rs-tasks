import './assets/style.scss';
import { TasksApi } from './TasksApi';
import { getWeekDays } from './datesHelper';
import { TasksTable } from './TasksTable';
import { TasksBacklog } from './TasksBacklog';
import { ITask } from './types';

async function run() {
  const users = await TasksApi.getUsers();
  const tasks = await TasksApi.getTasks();
  const days = getWeekDays();

  const userTasks: ITask[] = [];
  const backlogTasks: ITask[] = [];

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].executor) {
      userTasks.push(tasks[i]);
    } else {
      backlogTasks.push(tasks[i]);
    }
  }
  const taskTable = new TasksTable();
  const taskBacklog = new TasksBacklog();
  taskTable.update(users, userTasks, days);

  taskBacklog.update(backlogTasks);
  taskBacklog.onInput((e) => {
    const input = e.target as HTMLInputElement;
    const inputValue = input.value.toLowerCase();

    const backlogTasksFiltered = backlogTasks.filter(
      (task) =>
        task.subject.toLowerCase().includes(inputValue) ||
        task.description.toLowerCase().includes(inputValue)
    );

    taskBacklog.update(backlogTasksFiltered);
  });
}

run();
