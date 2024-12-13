import { Component, computed, input, output, signal } from '@angular/core';
import { TodoComponent } from './todo.component';
import { Todo } from '../shared/interfaces';
import { TodoFilterComponent } from './todo-filter.component';

@Component({
  selector: 'app-todos-list',
  imports: [TodoComponent, TodoFilterComponent],
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
export class TodosListComponent {
  filter = signal<string>('');
  todosList = input<Todo[]>([]);
  nbrOfFilteredTodos = computed(() => this.filteredTodosList()?.length);
  filteredTodosList = computed(() =>
    this.todosList().filter((t) => t.name.toLowerCase().includes(this.filter()))
  );
  updateTodo = output<Todo>();
  selectTodo = output<string>();
  deleteTodo = output<string>();
}
