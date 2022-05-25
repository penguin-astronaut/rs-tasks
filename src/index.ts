import './assets/style.scss';
import { TasksApi } from './TasksApi';
import { getDateEnd, getWeekDays } from './datesHelper';
import { TasksTable } from './TasksTable';
import { TasksBacklog } from './TasksBacklog';
import { ITask } from './types';

async function run() {
  const users = await TasksApi.getUsers();
  const tasks = await TasksApi.getTasks();
  const days = getWeekDays();

  let curFirstDayOfWeek = days[0].toString();

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
  taskTable.onPrevClick(() => {
    const previousDays = getWeekDays(curFirstDayOfWeek, 'previous');
    taskTable.update(users, userTasks, previousDays);
    curFirstDayOfWeek = previousDays[0].toString();
  });
  taskTable.onNextClick(() => {
    const nextDays = getWeekDays(curFirstDayOfWeek, 'next');
    taskTable.update(users, userTasks, nextDays);
    curFirstDayOfWeek = nextDays[0].toString();
  });
  taskTable.onDropListeners((taskId, userId, date) => {
    const index = backlogTasks.findIndex((task) => taskId === task.id);
    const task = backlogTasks[index];

    backlogTasks.splice(index, 1);

    task.executor = userId;

    if (date) {
      task.planStartDate = date;
      task.planEndDate = getDateEnd(task.planStartDate, task.planEndDate, date);
    }

    userTasks.push(task);

    taskBacklog.update(backlogTasks);
    taskTable.update(users, userTasks, days);
  });

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
