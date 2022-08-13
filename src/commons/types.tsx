export interface Todo {
  id: number;
  title: string;
  done: boolean;
  place?: string;
}

export type CompletedTodo = Todo & {
  readonly done: true;
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
  { id: 1, title: 'Learn TypeScript', done: false, place: 'home' },
  { id: 2, title: 'Learn React', done: false, place: 'work' },
];
