export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  place?: string;
  description?: string;
}

export type CompletedTodo = Todo & {
  readonly completed: true;
};

export interface List {
  items: Todo[];
  completed: boolean;
}

export interface Place {
  value: string;
  label: string;
}

export const places: readonly Place[] = [
  { value: 'home', label: 'Home' },
  { value: 'work', label: 'Work' },
];

export const toDoList = [
  { id: 1, title: 'Learn TypeScript', completed: false, place: 'home' },
  { id: 2, title: 'Learn React', completed: false, place: 'work' },
];
