export interface Todo {
  id: number
  text: string
  done: boolean
  place?: string
}

export type CompletedTodo = Todo & {
  readonly done: true
}

export interface List {
  items: Todo[]
  completed: boolean
}

export interface Place { value: string, label: string }

export const places: readonly Place[] = [
  { value: 'home', label: 'Home' },
  { value: 'work', label: 'Work' },
];

export const toDoList = [
  { id: 1, text: "Learn TypeScript", done: false, place: "home" },
  { id: 2, text: "Learn React", done: false, place: "work" }
]