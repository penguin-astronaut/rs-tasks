import { ITask, IUser } from './types';

export class TasksApi {
  private static BASE_URL =
    'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/';

  static getTasks = async (): Promise<ITask[]> => {
    const res = await fetch(`${TasksApi.BASE_URL}tasks`);

    if (!res.ok) {
      throw new Error('Tasks get error');
    }

    return res.json();
  };

  static getUsers = async (): Promise<IUser[]> => {
    const res = await fetch(`${TasksApi.BASE_URL}users`);

    if (!res.ok) {
      throw new Error('Users get error');
    }

    return res.json();
  };
}
