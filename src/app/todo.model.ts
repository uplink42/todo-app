export interface Todo {
  id: string;
  description: string;
  priority: TodoPriority;
  done: boolean;
  pinned: boolean;
}

export type TodoPriority = 'Low' | 'Medium' | 'High';

export interface TodoForm {
  description: string;
  priority: TodoPriority;
}

export type EventType =
  | 'Create'
  | 'Edit'
  | 'Pin'
  | 'Unpin'
  | 'Done'
  | 'Undone'
  | 'Delete';

export const TodoPrioritiesMap = [
  {
    id: 'Low',
  },
  {
    id: 'Medium',
  },
  {
    id: 'High',
  },
];

export const TodoDefaultPriority = 'Low';
