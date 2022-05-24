export interface IUser {
  id: number;
  username: string;
  surname: string;
  firstName: string;
  secondName: string;
}

export interface ITask {
  id: string;
  subject: string;
  description: string;
  creationAuthor: number;
  executor: number;
  creationDate: string;
  planStartDate: string;
  planEndDate: string;
  endDate: string;
  status: number;
  order: number;
}
