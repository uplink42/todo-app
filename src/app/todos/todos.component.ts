import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { TodoForm, Todo, TodoPriority } from '../todo.model';
import { TodosService } from '../todos.service';
import { deepClone } from '../utils';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  private readonly todosFilterRefresh$ = new BehaviorSubject<string>('');

  todos$ = combineLatest([
    this.todosFilterRefresh$,
    this.todoService.todos$,
  ]).pipe(
    map(([term, todos]) =>
      todos.filter((todo) => todo.description.includes(term))
    ),
    map((todos) => deepClone(todos))
  );

  history$ = this.todoService.todoHistory$.pipe(
    map((history) => deepClone(history))
  );

  highPriorityTodosCount$ = this.todoService.todos$.pipe(
    map(
      (todos) =>
        todos.filter((todo) => todo.priority === 'High' && !todo.done).length
    )
  );

  undoneTodosCount$ = this.todoService.todos$.pipe(
    map((todos) => todos.filter((todo) => !todo.done).length)
  );

  constructor(private todoService: TodosService) {}

  ngOnInit() {
    this.todoService.initialize();
  }

  createTodo(todo: TodoForm) {
    this.todoService.addTodo(todo);
  }

  togglePinned(todo: Todo) {
    this.todoService.togglePinned(todo);
  }

  toggleDone(todo: Todo) {
    this.todoService.toggleDone(todo);
  }

  changePriority(event: { todo: Todo; priority: TodoPriority }) {
    this.todoService.changePriority(event.todo, event.priority);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  searchTodos(term: string) {
    this.todosFilterRefresh$.next(term);
  }
}
