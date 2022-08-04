export interface Todo {
  id: number
  text: string
  done: boolean
}
export type CompletedTodo = Todo & {
  readonly done: true
}