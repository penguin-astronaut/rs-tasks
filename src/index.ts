import { TasksApi } from './TasksApi';
import { getDateEnd, getWeekDays } from './helpers/datesHelper';
import { TasksTable } from './TasksTable';
import { TasksBacklog } from './TasksBacklog';
import { filter, joinTasksToUsers } from './helpers/tasksHelpers';

import './assets/style.scss';

async function run() {
  const users = await TasksApi.getUsers();
  const tasks = await TasksApi.getTasks();

  const { usersWithTasks, backlogTasks } = joinTasksToUsers(tasks, users);

  let days = getWeekDays();
  let inputValue = '';

  const taskTable = new TasksTable();
  const taskBacklog = new TasksBacklog();

  taskTable.update(usersWithTasks, days);
  taskTable.onPrevClick(() => {
    days = getWeekDays(days[0].toString(), 'previous');
    taskTable.update(usersWithTasks, days);
  });
  taskTable.onNextClick(() => {
    days = getWeekDays(days[0].toString(), 'next');
    taskTable.update(usersWithTasks, days);
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

    const userIndex = usersWithTasks.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      usersWithTasks[userIndex].tasks?.push(task);
    }

    taskBacklog.update(filter(backlogTasks, inputValue));
    taskTable.update(usersWithTasks, days);
  });

  taskBacklog.update(filter(backlogTasks, inputValue));
  taskBacklog.onInput((e) => {
    const input = e.target as HTMLInputElement;
    inputValue = input.value.toLowerCase();
    taskBacklog.update(filter(backlogTasks, inputValue));
  });
}

run();
