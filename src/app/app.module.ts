import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { FormsModule } from '@angular/forms';
import { TodoHistoryComponent } from './todo-history/todo-history.component';
import { TodosComponent } from './todos/todos.component';
import { ReversePipe } from './reverse.pipe';
import { TodosStatusComponent } from './todos-status/todos-status.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';

@NgModule({
  declarations: [AppComponent, TodoListComponent, NewTodoComponent, TodoHistoryComponent, TodosComponent, ReversePipe, TodosStatusComponent, TodoSearchComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
