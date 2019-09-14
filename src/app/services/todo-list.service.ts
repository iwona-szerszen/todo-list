import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todoListSubject: Subject<TodoItem[]> = new Subject<TodoItem[]>();
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private storageService: StorageService, private http: HttpClient) {
    this.retrieveListFromDataBase();
   }

  retrieveListFromDataBase() {
    this.http.get<TodoItem[]>('http://localhost:3000/items').subscribe(
      response => this.todoListSubject.next(response)
    );
  }

  getTodoList() {
    return this.todoListSubject.asObservable();
  }

  addItem(item: TodoItem) {
    this.http.post('http://localhost:3000/items',
      JSON.stringify({
        title: item.title,
        completed: item.completed || false,
        isBeingEdited: item.isBeingEdited || false
      }),
      {headers: this.headers}).subscribe(
      () => this.retrieveListFromDataBase()
    );
  }

  updateItem(item: TodoItem, changes) {
    return this.http.put(`http://localhost:3000/items/${item._id}`,
      JSON.stringify({...item, ...changes}), {headers: this.headers}).subscribe(
        () => this.retrieveListFromDataBase()
      );
  }

  deleteItem(item: TodoItem) {
    return this.http.delete(`http://localhost:3000/items/${item._id}`).subscribe(
      () => this.retrieveListFromDataBase()
    );
  }
}
