export interface ITodo {
  id: number;
  author: string | null;
  title: string;
  description: string;
  complited: boolean;
  editUser?: string | null;
  editDate?: number;
}

export interface IUser {
  name: string;
  password: string;
}

export interface IStateUser {
  user: IinitialStateUser;
}

export interface IinitialStateUser {
  id: number | null;
  name: string | null;
  pasword: string | null;
}
