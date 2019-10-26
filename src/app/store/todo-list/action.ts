import { createAction, props } from '@ngrx/store';
import { TodoItem } from 'src/app/interfaces/todo-item';

export const setNewItem = createAction('[Todo list] Set new todo list item', props<{item: TodoItem}>());

export const deleteTodoItem = createAction('[Todo list] Delete todo item', props<{id: string}>());
