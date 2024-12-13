import { Component } from '@angular/core';
import { TodoContainerComponent } from './components/todo-container.component';

@Component({
  selector: 'app-root',
  imports: [TodoContainerComponent],
  template: ` <app-todo-container class="container" /> `,
})
export class AppComponent {}
