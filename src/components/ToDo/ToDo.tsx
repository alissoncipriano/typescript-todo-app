import './ToDo.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { useState } from 'react';
import { Todo, CompletedTodo, List } from '../../consts/types';

const toDoList = [
  { id: 1, text: "Learn TypeScript", done: false, place: "home" },
  { id: 2, text: "Learn React", done: false, place: "work" }
]


export default function ToDo() {
  const [list, setList] = useState<List>({ items: toDoList, completed: false });

  const toggleTodo = (todo: Todo): void => {
    const newList = list.items.map(listItem => {
      // 👇️ if id equals 2, update country property
      if (listItem.id === todo.id) {
        return {...listItem, done: !todo.done}
      }

      // 👇️ otherwise return object as is
      return listItem;
    });

    setList({ ...list, items: newList });
  }

  function handleComplete (todos: readonly Todo[], action: 'check' | 'uncheck'): CompletedTodo[] | Todo[] {
    if (action === 'check') 
      return todos.map(todo => ({
        ...todo,
        done: true
      }));
      
    return todos.map(todo => ({
      ...todo,
      done: false
    }));
  }

  function placeToString(place: string): string {
    if (place === 'home') {
      return '🏡 Home'
    } else if (place === 'work') {
      return '💻 Work'
    } else {
      return '📌 ' + place
    }
  }

  return (
    <div className='ToDo'>
      <ul className='ToDo-list'>
        {
          list.items?.map(todo => (
            <TodoItem
              item={ todo }
              toggleTodo={ toggleTodo }
              placeToString={ placeToString }
              key={ todo.id } />
          ))
        }
      </ul>

      <button
        className='ToDo-button'
        onClick={() => list.completed ? setList({ items: handleComplete(list.items, 'uncheck'), completed: !list.completed }) : setList({ items: handleComplete(list.items, 'check'), completed: !list.completed })}
      >
        {list.completed && 'Marcar todas como incompletas'}
        {!list.completed && 'Marcar todas como completas'}
      </button>
    </div>
  )
}
