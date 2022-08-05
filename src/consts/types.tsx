export type Todo = {
  id: number
  text: string
  done: boolean
  place?: string
}
export type CompletedTodo = Todo & {
  readonly done: true
}
export type List = {
  items: Todo[]
  completed: boolean
}

export type Place = { value: 'home', label: string, color?: string } | { value: 'work', label: string, color?: string } | { value: string, label: string, color?: string }

export const places: readonly Place[] = [
  { value: 'home', label: 'Home', color: '#5243AA' },
  { value: 'work', label: 'Work', color: '#5243AA' },
];