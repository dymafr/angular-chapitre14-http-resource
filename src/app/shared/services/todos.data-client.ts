import { Injectable, resource, signal } from '@angular/core';
import { TodoI, TodoFormI } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodosDataClient {
  BASE_URL = 'https://restapi.fr/api/atodos';

  todosResource = resource({
    loader: async (): Promise<TodoI[]> =>
      (await fetch(`${this.BASE_URL}?delay=1`)).json(),
  });
  selectedTodoId = signal<string | null>(null);
  selectedTodoResource = resource({
    params: () => ({ id: this.selectedTodoId() }),
    loader: async ({ params, abortSignal }): Promise<TodoI | undefined> => {
      if (params.id) {
        return (
          await fetch(`${this.BASE_URL}/${params.id}`, { signal: abortSignal })
        ).json();
      } else {
        return;
      }
    },
  });

  selectTodo(todoId: string) {
    this.selectedTodoId.set(todoId);
  }

  async addTodo(todo: TodoFormI) {
    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const body = await response.json();
      if (response.ok) {
        this.todosResource.update((todos) =>
          todos ? [...todos, body] : [body]
        );
      } else {
        throw new Error('Oops');
      }
    } catch (e) {
      throw new Error('Oops');
    }
  }

  async updateTodo(todo: TodoI) {
    try {
      const { _id, ...restTodo } = todo;
      const response = await fetch(`${this.BASE_URL}/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify(restTodo),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const body = await response.json();
      if (response.ok) {
        this.todosResource.update((todos) =>
          todos?.map((t) => (t._id === (body as TodoI)._id ? body : t))
        );
        this.selectedTodoResource.reload();
      } else {
        throw new Error('Oops');
      }
    } catch (e) {
      throw new Error('Oops');
    }
  }

  async deleteTodo(todoId: string) {
    try {
      const response = await fetch(`${this.BASE_URL}/${todoId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        this.todosResource.update((todos) =>
          todos?.filter(({ _id }) => _id !== todoId)
        );
        if (this.selectedTodoId() === todoId) {
          this.selectedTodoId.set(null);
        }
      } else {
        throw new Error('Oops');
      }
    } catch (e) {
      throw new Error('Oops');
    }
  }
}
