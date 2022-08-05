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