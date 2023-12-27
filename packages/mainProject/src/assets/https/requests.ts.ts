import axios from 'axios';
import { ITodo, IUser } from '../types/types';

export async function getTodos(cb: any) {
  const url = 'http://localhost:9000/todos';
  await axios
    .get(url)
    .then((response) => {
      cb(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function createTodos(todo: ITodo, cb: any) {
  const url = 'http://localhost:9000/todos';
  await axios
    .post(url, todo)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  await getTodos(cb);
}

export async function editTodo(todo: ITodo, cb: any) {
  const url = `http://localhost:9000/todos/${todo.id}`;
  await axios
    .put(url, todo)
    .then((response) => {
      cb(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  await getTodos(cb);
}

export async function deleteTodo(id: any, cb: any) {
  const url = 'http://localhost:9000/todos';
  await axios
    .delete(`${url}/${id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  await getTodos(cb);
}

//=======users==================

export async function register(user: IUser, cb: any) {
  const url = 'http://localhost:9000/users';
  await axios
    .post(url, user)
    .then((response) => {
      cb(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function signIn(user: IUser, cb: any) {
  const url = 'http://localhost:9000/users';
  await axios
    .get(url)
    .then((response) => {
      const data: IUser = response.data.find(
        (e: IUser) => e.name === user.name
      );
      if (data.password === user.password) {
        cb(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
