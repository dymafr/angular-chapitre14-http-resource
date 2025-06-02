import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-filter',
  imports: [FormsModule],
  template: `
    <input
      type="text"
      [(ngModel)]="filter"
      class="border py-6"
      placeholder="Rechercher"
    />
  `,
})
export class TodoFilter {
  filter = model<string>('');
}
