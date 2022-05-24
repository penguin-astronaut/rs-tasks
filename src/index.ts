import './assets/style.scss';
import { TasksApi } from './TasksApi';

async function run() {
  const users = await TasksApi.getUsers();
  const tasks = await TasksApi.getTasks();

  console.log(users);
  console.log(tasks);
}

run();
