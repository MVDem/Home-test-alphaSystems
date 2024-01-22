export interface ITodo {
  id: number;
  author: string | null;
  title: string;
  description: string;
  complited: boolean;
  editUser?: string | null;
  editDate?: number;
}

export interface IState {
  todos: IinitialStateTodos;
  user: IinitialStateUser;
}

export interface IinitialStateTodos {
  todos: ITodo[] | [];
}

export interface IUser {
  name: string;
  password: string;
}

export interface IinitialStateUser {
  id: number | null;
  name: string | null;
  pasword: string | null;
}
