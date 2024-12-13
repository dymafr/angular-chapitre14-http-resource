import { Component, computed, inject, signal } from '@angular/core';
import { TodoFormComponent } from './todo-form.component';
import { TodosListComponent } from './todos-list.component';
import { Todo, TodoForm } from '../shared/interfaces';
import { TodosService } from '../shared/services/todos.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todo-container',
  imports: [TodoFormComponent, TodosListComponent, JsonPipe],
  template: `
    <app-todo-form (addTodo)="addTodo($event)" />
    @if (todosIsLoading()) {
    <h2>Chargement en cours ...</h2>
    } @else {
    <app-todos-list
      (updateTodo)="updateTodo($event)"
      (selectTodo)="selectTodo($event)"
      (deleteTodo)="deleteTodo($event)"
      [todosList]="todosList()"
    />
    <pre>{{ selectedTodo() | json }}</pre>
    }
  `,
  styles: `
    :host { padding: 32px; }
  `,
})
export class TodoContainerComponent {
  todosService = inject(TodosService);
  todosList = computed(() => this.todosService.todosResource.value() || []);
  todosIsLoading = this.todosService.todosResource.isLoading;
  selectedTodo = this.todosService.selectedTodoResource.value;

  addTodo(todo: TodoForm) {
    this.todosService.addTodo(todo);
  }

  selectTodo(todoId: string) {
    this.todosService.selectTodo(todoId);
  }

  updateTodo(todo: Todo) {
    this.todosService.updateTodo(todo);
  }

  deleteTodo(todoId: string) {
    this.todosService.deleteTodo(todoId);
  }
}
