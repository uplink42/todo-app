import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventType, Todo, TodoForm, TodoPriority } from './todo.model';

const MAX_HISTORY_LENGTH = 10;

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly todos = new BehaviorSubject<Todo[]>([]);

  readonly todos$ = this.todos.asObservable();

  private readonly todoHistory = new BehaviorSubject<string[]>([]);

  readonly todoHistory$ = this.todoHistory.asObservable();

  initialize() {
    const todos = localStorage.getItem('todos');
    const history = localStorage.getItem('history');

    if (todos) {
      this.todos.next(JSON.parse(todos));
    }

    if (history) {
      this.todoHistory.next(JSON.parse(history));
    }
  }

  addTodo(data: TodoForm) {
    const todo: Todo = {
      id: Math.random().toString(),
      description: data.description,
      priority: data.priority,
      done: false,
      pinned: false,
    };

    this.todos.next([...this.todos.value, todo]);
    this.addHistoryMessage(todo, 'Create');
    this.saveToStorage();
  }

  togglePinned(todo: Todo) {
    const newTodos = [
      ...this.todos.value.map((t) =>
        t.id === todo.id ? { ...t, pinned: !t.pinned } : t
      ),
    ];

    this.todos.next([
      ...newTodos.filter((nt) => nt.pinned),
      ...newTodos.filter((nt) => !nt.pinned),
    ]);

    if (todo.pinned) {
      this.addHistoryMessage(todo, 'Unpin');

      return;
    }

    this.addHistoryMessage(todo, 'Pin');
    this.saveToStorage();
  }

  toggleDone(todo: Todo) {
    this.todos.next([
      ...this.todos.value.map((t) =>
        t.id === todo.id ? { ...t, done: !t.done } : t
      ),
    ]);

    if (todo.done) {
      this.addHistoryMessage(todo, 'Undone');

      return;
    }

    this.addHistoryMessage(todo, 'Done');
    this.saveToStorage();
  }

  changePriority(todo: Todo, priority: TodoPriority) {
    this.todos.next([
      ...this.todos.value.map((t) =>
        t.id === todo.id ? { ...t, priority } : t
      ),
    ]);

    this.addHistoryMessage(todo, 'Edit');
    this.saveToStorage();
  }

  deleteTodo(todo: Todo) {
    this.todos.next([...this.todos.value.filter((t) => t.id !== todo.id)]);
    this.addHistoryMessage(todo, 'Delete');
    this.saveToStorage();
  }

  addHistoryMessage(todo: Todo, event: EventType) {
    const message = this.generateHistoryMessage(todo, event);

    this.todoHistory.next([
      ...this.todoHistory.value.slice(-MAX_HISTORY_LENGTH + 1),
      message,
    ]);
  }

  private generateHistoryMessage(todo: Todo, event: EventType) {
    const messageTemplates = {
      Create: (todo: Todo) =>
        `[CREATED] - Todo "${todo.description}" was created.`,
      Edit: (todo: Todo) => `[EDITED] - Todo "${todo.description}" was edited.`,
      Pin: (todo: Todo) => `[PINNED] - Todo "${todo.description}" was pinned.`,
      Unpin: (todo: Todo) =>
        `[UNPINNED] - Todo "${todo.description}" was unpinned.`,
      Done: (todo: Todo) =>
        `[DONE] - Todo "${todo.description}" was set to Done.`,
      Undone: (todo: Todo) =>
        `[UNDONE] - Todo "${todo.description}" was set to Undone.`,
      Delete: (todo: Todo) =>
        `[DELETED] - Todo "${todo.description}" was deleted.`,
    };

    return messageTemplates[event](todo);
  }

  private saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos.value));
    localStorage.setItem('history', JSON.stringify(this.todoHistory.value));
  }
}
