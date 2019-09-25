import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-list-manager',
  template: `
    <div class="todo-app">
      <app-input-button-unit (submit)="addItem($event)"></app-input-button-unit>

      <ul *ngIf="todoList">
        <li *ngFor="let todoItem of todoList; let index = index">
          <app-todo-item
            *ngIf="!todoItem.isBeingEdited"
            [item]="todoItem"
            (remove)="removeItem($event)"
            (update)="updateItem($event.item, $event.changes)"
            (editMode)="setEditMode(index)"
          >
          </app-todo-item>

          <app-input-button-unit
            *ngIf="todoItem.isBeingEdited"
            class="edit-input-btn-unit"
            [title]="todoItem.title"
            (submit)="
              changeTitle(
                todoItem,
                { title: $event, isBeingEdited: false},
                index
              )
            "
          >
          </app-input-button-unit>

        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {

  todoList: TodoItem[];
  todoListSubscription: Subscription;

  constructor(private todoListService: TodoListService) {}

  ngOnInit() {
    this.todoListSubscription = this.todoListService
      .getTodoList()
      .subscribe(value => (this.todoList = value));
  }

  addItem(title: string) {
    this.todoListService.addItem({ title });
  }

  setEditMode(index) {
    this.todoList[index].isBeingEdited = true;
  }

  changeTitle(item, changes, index) {
    this.todoList[index].isBeingEdited = false;
    this.todoListService.updateItem(item, changes);
  }

  updateItem(item, changes) {
    this.todoListService.updateItem(item, changes);
  }

  removeItem(item) {
    this.todoListService.deleteItem(item);
  }
}
