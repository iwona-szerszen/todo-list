import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, FormBuilder, FormArray, Validators } from '@angular/forms';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hobby: string;
  bestFriendName: string;
  dateOfBirth: Date;
  skills: string[];
}

@Component({
  selector: 'app-user-info',
  template: `
  <h3>Example of reactive form</h3>
    <form [formGroup]="userFormGroup" #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
      <mat-form-field>
        <input type="text" formControlName="firstName" matInput placeholder="first name" required>
      </mat-form-field>
      <mat-form-field>
        <input type="text" formControlName="lastName" matInput placeholder="last name" required>
      </mat-form-field>
      <mat-form-field>
        <input type="email" formControlName="email" matInput placeholder="email" required>
      </mat-form-field>
      <mat-form-field>
        <input type="text" formControlName="phone" matInput placeholder="phone">
      </mat-form-field>
      <mat-form-field>
        <input type="text" formControlName="hobby" matInput placeholder="hobby">
      </mat-form-field>
      <mat-form-field>
        <input type="text" formControlName="bestFriendName" matInput placeholder="best friend's name">
      </mat-form-field>
      <mat-form-field>
        <input type="date" formControlName="dateOfBirth" matInput>
      </mat-form-field>
      <div formArrayName="skills">
        <button
          type="button"
          mat-raised-button
          (click)="addSkills()"
        >
          Add alias
        </button>
        <div *ngFor="let skill of skills.controls; let i=index">
          <mat-form-field>
            <input type="text" [formControlName]="i" matInput placeholder="skill {{ i + 1 }}">
          </mat-form-field>
        </div>
      </div>
      <button type="submit" [disabled]="userFormGroup.invalid" mat-raised-button color="primary">
        Submit
      </button>
    </form>
    <div *ngIf="gatheredUserInfo">
      <h3>Gathered info about the User</h3>
      <p>First name: {{ gatheredUserInfo.firstName }}
        <button mat-icon-button (click)="editField('firstName')">
          <mat-icon>edit</mat-icon>
        </button>
      </p>
      <p>Last name: {{ gatheredUserInfo.lastName }}
        <button mat-icon-button (click)="editField('lastName')">
          <mat-icon>edit</mat-icon>
        </button>
      </p>
      <p>Email: {{ gatheredUserInfo.email }}
        <button mat-icon-button (click)="editField('email')">
          <mat-icon>edit</mat-icon>
        </button>
      </p>
    </div>
    <button type="button" mat-raised-button color="accent" (click)="fillDefault()">Fill default</button>
  `,
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  gatheredUserInfo: User;
  defaultFirstName = 'Iwona';
  defaultLastName = 'Szerszen';
  defaultEmail = 'my.email@gmail.com';

  userFormGroup = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: ['', Validators.email],
    phone: [''],
    hobby: [''],
    bestFriendName: [''],
    dateOfBirth: [''],
    skills: this.formBuilder.array([this.formBuilder.control('')])
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(userForm: NgForm) {
    this.userFormGroup.disable();
    this.gatheredUserInfo = this.userFormGroup.getRawValue();
  }

  fillDefault() {
    this.userFormGroup.patchValue({
      firstName: this.defaultFirstName,
      lastName: this.defaultLastName,
      email: this.defaultEmail
    });
  }

  editField(fieldName: string) {
    this.userFormGroup.controls[fieldName].enable();
  }

  get skills() {
    return this.userFormGroup.get('skills') as FormArray;
  }

  addSkills() {
    this.skills.push(this.formBuilder.control(''));
  }
}
