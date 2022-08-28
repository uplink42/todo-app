import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { trackByFn } from '../utils';

@Component({
  selector: 'app-todo-history',
  templateUrl: './todo-history.component.html',
  styleUrls: ['./todo-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoHistoryComponent implements OnInit {
  @Input() messages!: string[];

  trackByFn = trackByFn;

  ngOnInit(): void {}
}
