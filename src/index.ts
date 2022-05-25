import { TasksApi } from './TasksApi';
import { getDateEnd, getWeekDays } from './helpers/datesHelper';
import { TasksTable } from './TasksTable';
import { TasksBacklog } from './TasksBacklog';
import { filter, splitTasks } from './helpers/tasksHelpers';

import './assets/style.scss';

async function run() {
  const users = await TasksApi.getUsers();
  const tasks = await TasksApi.getTasks();

  const { userTasks, backlogTasks } = splitTasks(tasks);

  let days = getWeekDays();
  let inputValue = '';

  const taskTable = new TasksTable();
  const taskBacklog = new TasksBacklog();

  taskTable.update(users, userTasks, days);
  taskTable.onPrevClick(() => {
    days = getWeekDays(days[0].toString(), 'previous');
    taskTable.update(users, userTasks, days);
  });
  taskTable.onNextClick(() => {
    days = getWeekDays(days[0].toString(), 'next');
    taskTable.update(users, userTasks, days);
  });
  taskTable.onDropListeners((taskId, userId, date) => {
    const index = backlogTasks.findIndex((task) => taskId === task.id);
    const task = backlogTasks[index];

    backlogTasks.splice(index, 1);

    task.executor = userId;

    if (date) {
      task.planEndDate = getDateEnd(task.planStartDate, task.planEndDate, date);
      task.planStartDate = date;
    }

    userTasks.push(task);
    taskBacklog.update(filter(backlogTasks, inputValue));
    taskTable.update(users, userTasks, days);
  });

  taskBacklog.update(filter(backlogTasks, inputValue));
  taskBacklog.onInput((e) => {
    const input = e.target as HTMLInputElement;
    inputValue = input.value.toLowerCase();
    taskBacklog.update(filter(backlogTasks, inputValue));
  });
}

run();
