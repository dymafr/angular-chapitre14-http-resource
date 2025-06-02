import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoFormI } from '../shared/interfaces';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  template: `
    <input
      type="text"
      [(ngModel)]="todoName"
      class="flex-auto border"
      placeholder="Entrez une todo"
    />
    <button (click)="addTodoInput()" class="btn btn-primary">Ajouter</button>
  `,
  styles: `
    :host {
      display:flex;
      gap:12px;
    }
  `,
})
export class TodoForm {
  todoName = '';
  addTodo = output<TodoFormI>();

  addTodoInput() {
    if (this.todoName) {
      const newTodo: TodoFormI = {
        name: this.todoName,
        done: false,
      };
      this.todoName = '';
      this.addTodo.emit(newTodo);
    }
  }
}
