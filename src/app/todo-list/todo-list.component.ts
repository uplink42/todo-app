import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Todo, TodoPrioritiesMap, TodoPriority } from '../todo.model';
import { trackByFn } from '../utils';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  @Input() todos!: Todo[];

  @Output() togglePinned = new EventEmitter<Todo>();

  @Output() toggleDone = new EventEmitter<Todo>();

  @Output() changePriority = new EventEmitter<{
    todo: Todo;
    priority: TodoPriority;
  }>();

  @Output() delete = new EventEmitter<Todo>();

  isEditingPriority: { [key: string]: boolean } = {};

  priorities = TodoPrioritiesMap;

  trackByFn = trackByFn;

  constructor() {}

  ngOnInit(): void {}

  handleChangePriority(todo: Todo, value: TodoPriority) {
    if (todo.done) {
      return;
    }

    this.changePriority.emit({
      todo: todo,
      priority: value,
    });

    this.toggleEditPriorityState(todo.id);
  }

  toggleEditPriorityState(id: string) {
    this.isEditingPriority = {
      ...this.isEditingPriority,
      [id]: !this.isEditingPriority[id],
    };
  }
}
