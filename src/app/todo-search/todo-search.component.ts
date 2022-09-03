import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.css'],
})
export class TodoSearchComponent implements OnInit {
  @Input() todos: Todo[] = [];

  @Output() search = new EventEmitter<string>();

  searchTerm = '';

  constructor() {}

  ngOnInit(): void {}
}
