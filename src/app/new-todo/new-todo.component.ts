import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  TodoDefaultPriority,
  TodoForm,
  TodoPrioritiesMap,
} from '../todo.model';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTodoComponent implements OnInit {
  @Output() created = new EventEmitter<TodoForm>();

  todo: TodoForm = {
    description: '',
    priority: TodoDefaultPriority,
  };

  priorities = TodoPrioritiesMap;

  constructor() {}

  ngOnInit(): void {}

  submitForm() {
    this.created.emit(this.todo);
    this.todo = {
      description: '',
      priority: TodoDefaultPriority,
    };
  }
}
