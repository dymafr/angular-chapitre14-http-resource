import { Component, computed, inject, signal } from '@angular/core';
import { TodoForm } from './todo-form';
import { TodosList } from './todos-list';
import { TodoI, TodoFormI } from '../shared/interfaces';
import { TodosDataClient } from '../shared/services/todos.data-client';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todo-container',
  imports: [TodoForm, TodosList, JsonPipe],
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
export class TodoContainer {
  todosService = inject(TodosDataClient);
  todosList = computed(() => this.todosService.todosResource.value() || []);
  todosIsLoading = this.todosService.todosResource.isLoading;
  selectedTodo = this.todosService.selectedTodoResource.value;

  addTodo(todo: TodoFormI) {
    this.todosService.addTodo(todo);
  }

  selectTodo(todoId: string) {
    this.todosService.selectTodo(todoId);
  }

  updateTodo(todo: TodoI) {
    this.todosService.updateTodo(todo);
  }

  deleteTodo(todoId: string) {
    this.todosService.deleteTodo(todoId);
  }
}
