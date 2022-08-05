import './ToDo.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { useEffect, useState } from 'react';
import { Todo, CompletedTodo, List } from '../../consts/types';
import AddTask from '../AddTask/AddTask';

const toDoList = [
  { id: 1, text: "Learn TypeScript", done: false, place: "home" },
  { id: 2, text: "Learn React", done: false, place: "work" }
]

export default function ToDo() {
  const [list, setList] = useState<List>({ items: toDoList, completed: false });
  const [path, setPath] = useState<string>('');

  const toggleTodo = (todo: Todo): void => {
    const newList = list.items.map(listItem => {
      // 👇️ if id equals 2, update country property
      if (listItem.id === todo.id) {
        return {...listItem, done: !todo.done}
      }

      // 👇️ otherwise return object as is
      return listItem;
    });

    const checks = newList.map(item => item.done);
    let allEqual: boolean = true;

    for (let i = 0; i < checks.length; i++) {
      for (let k = i + 1; k < checks.length; k++) {
          if (checks[i] != checks[k]) {
            allEqual = false;
          }
      }
    }

    if (allEqual && newList[0].done === true) {
      setList({ completed: true, items: newList });
    }
    else if (allEqual && newList[0].done === false) {
      setList({ completed: false, items: newList });
    }
    else if (!allEqual) {
      setList({ completed: false, items: newList });
    }
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

  const toggleShowAddTask = (): void => {
    setPath('');
  }

  const handleTaskAdd = (text: string, place: any, done: boolean): void => {
    let oldList = list;
    let newList = oldList;

    const newItemID = newList.items[newList.items.length - 1].id + 1;

    newList.items.push({id: newItemID, text: text, done: done, place: place.value});
    setList(newList);
    toggleShowAddTask();
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

      <div
        className='ToDo-add'
        onClick={() => setPath('newTask')}
      >
        <span>+</span> Adicionar nova task
      </div>

      {
        path === 'newTask' &&
        <AddTask toggleShow={toggleShowAddTask} addTask={handleTaskAdd} />
      }
    </div>
  )
}
