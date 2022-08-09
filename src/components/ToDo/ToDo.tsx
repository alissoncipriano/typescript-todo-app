import './ToDo.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { useState } from 'react';
import { Todo, CompletedTodo, List, toDoList } from '../../commons/types';
import AddTask from '../AddTask/AddTask';

export default function ToDo() {
  const [list, setList] = useState<List>({ items: toDoList, completed: false });
  const [path, setPath] = useState<string>('');

  const toggleTodo = (todo: Todo): void => {
    // Muda apenas o done do item clicado
    const newList = list.items.map(listItem => {
      if (listItem.id === todo.id) {
        return {...listItem, done: !todo.done}
      }

      return listItem;
    });

    // Recebe somente a prop done de todos os itens da lista
    const checks = newList.map(item => item.done);

    let allEqual: boolean = true;

    for (let i = 0; i < checks.length; i++) {
      for (let k = i + 1; k < checks.length; k++) {
          if (checks[i] !== checks[k]) {
            allEqual = false;
            break;
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

  function checkAll (todos: readonly Todo[]): CompletedTodo[] {
    return todos.map(todo => ({
      ...todo,
      done: true
    }));
  }

  function uncheckAll (todos: readonly Todo[]): Todo[] {
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
    let newList = list;

    const newItemID = newList.items[newList.items.length - 1].id + 1;

    newList.items.push({id: newItemID, text: text, done: done, place: place.value});
    setList(newList);
    toggleShowAddTask();
  }

  return (
    <div className='ToDo'>
      <ul className='ToDo-list' data-testid='ToDo-list'>
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
        onClick={() => list.completed ? setList({ items: uncheckAll(list.items), completed: !list.completed }) : setList({ items: checkAll(list.items), completed: !list.completed })}
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
