import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="app-title">
      Welcome to {{ title }}!
    </h1>

    <app-list-manager></app-list-manager>
    <app-user-info></app-user-info>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My To Do List APP';
}
