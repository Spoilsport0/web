export interface ITask {
  id: string;
  title: string;
  condition: string;
  description: string;
  date_of_Start: Date | null;
  date_of_End: Date | null;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
}
