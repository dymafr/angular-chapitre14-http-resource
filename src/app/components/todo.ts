import { Component, input, output } from '@angular/core';
import { TodoI } from '../shared/interfaces';

@Component({
  selector: 'app-todo',
  imports: [],
  template: `
    @let t = todo();
    <li class="flex px-12 gap-12 border">
      <p (click)="selectTodo.emit(t._id)" class="flex-auto">
        {{ t.name }}
      </p>
      <button (click)="deleteTodo.emit(t._id)">supprimer</button>
      <input (click)="toggleTodo()" type="checkbox" [checked]="t.done" />
    </li>
  `,
})
export class Todo {
  todo = input.required<TodoI>();
  updateTodo = output<TodoI>();
  selectTodo = output<string>();
  deleteTodo = output<string>();
  toggleTodo() {
    this.updateTodo.emit({ ...this.todo(), done: !this.todo().done });
  }
}
