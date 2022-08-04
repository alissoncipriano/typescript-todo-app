import './ToDo.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { useState } from 'react';
import { Todo, CompletedTodo } from '../../types';

const toDoList = [
  { id: 1, text: "Learn TypeScript", done: false },
  { id: 2, text: "Learn React", done: false }
]

export default function ToDo() {
  const [toDos, setToDos] = useState<Todo[]>(toDoList);

  const toggleTodo = (todo: Todo): void => {
    const newList = toDos.map(listItem => {
      // 👇️ if id equals 2, update country property
      if (listItem.id === todo.id) {
        return {...listItem, done: !todo.done};
      }

      // 👇️ otherwise return object as is
      return listItem;
    });

    setToDos(newList);
  }

  function completeAll (todos: readonly Todo[]): CompletedTodo[] {
    return todos.map(todo => ({
      ...todo,
      done: true
    }));
  }

  return (
    <div className='ToDo'>
      <ul className='ToDo-list'>
        {
          toDos?.map(todo => (
            <TodoItem item={ todo } toggleTodo={ toggleTodo } key={ todo.id } />
          ))
        }
      </ul>

      <button
        className='ToDo-button'
        onClick={() => setToDos(completeAll(toDos))}
      >
        Marcar todas como completas
      </button>
    </div>
  )
}
