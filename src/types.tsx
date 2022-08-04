export interface Todo {
  id: number
  text: string
  done: boolean
  place?: string
}
export type CompletedTodo = Todo & {
  readonly done: true
}