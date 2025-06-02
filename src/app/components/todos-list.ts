import { Component, computed, input, output, signal } from '@angular/core';
import { Todo } from './todo';
import { TodoI } from '../shared/interfaces';
import { TodoFilter } from './todo-filter';

@Component({
  selector: 'app-todos-list',
  imports: [Todo, TodoFilter],
  template: `
    <hr />
    <app-todo-filter [(filter)]="filter" />
    <hr />
    <p>Nombre de todo : {{ nbrOfFilteredTodos() }}</p>
    <hr />
    <ul class="flex flex-col gap-12">
      @for(todo of filteredTodosList(); track todo._id ) {
      <app-todo
        (selectTodo)="selectTodo.emit($event)"
        (updateTodo)="updateTodo.emit($event)"
        (deleteTodo)="deleteTodo.emit($event)"
        [todo]="todo"
      />
      } @empty {
      <li>Il n'y a pas de todo pour l'instant</li>
      }
    </ul>
  `,
  styles: `ul { margin-top: 12px }`,
})
export class TodosList {
  filter = signal<string>('');
  todosList = input<TodoI[]>([]);
  nbrOfFilteredTodos = computed(() => this.filteredTodosList()?.length);
  filteredTodosList = computed(() =>
    this.todosList().filter((t) => t.name.toLowerCase().includes(this.filter()))
  );
  updateTodo = output<TodoI>();
  selectTodo = output<string>();
  deleteTodo = output<string>();
}
