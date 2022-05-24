import './assets/style.scss';
import { TasksApi } from './TasksApi';
import { getWeekDays } from './datesHelper';
import { TasksTable } from './TasksTable';

async function run() {
  const users = await TasksApi.getUsers();
  const tasks = await TasksApi.getTasks();
  const days = getWeekDays();
  console.log(days);
  const taskTable = new TasksTable();
  taskTable.updateRows(users, tasks, days);
}

run();
