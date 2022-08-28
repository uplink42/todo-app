import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-todos-status',
  templateUrl: './todos-status.component.html',
  styleUrls: ['./todos-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosStatusComponent implements OnInit {
  @Input() highPriorityTodosCount = 0;

  @Input() undoneTodosCount = 0;

  constructor() {}

  ngOnInit(): void {}
}
