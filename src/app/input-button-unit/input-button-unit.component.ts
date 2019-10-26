import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input-button-unit',
  template: `
    <h3>Example of template-driven form</h3>
    <form #itemForm="ngForm" (ngSubmit)="submitValue(itemForm)">
      <div class="form-group">
        <input
          class="todo-input form-control"
          name="title"
          [(ngModel)]="title"
          required
          matInput
        >
      </div>
      <button
        mat-raised-button
        color="primary"
        type="submit"
      >
        Save
      </button>
    </form>
  `,
  styleUrls: ['./input-button-unit.component.css']
})
export class InputButtonUnitComponent implements OnInit {

  @Output() submitItem: EventEmitter<string> = new EventEmitter();

  title = 'Hello World';

  constructor() {}

  ngOnInit() {
  }

  submitValue(newTitleForm: NgForm) {
    if (newTitleForm.valid) {
      this.submitItem.emit(newTitleForm.value.title);
      newTitleForm.resetForm();
    } else {
      alert('Form is invalid');
    }
  }

}
