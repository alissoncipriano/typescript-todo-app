import { StyledToDo } from './styles';
import { TodoItem } from '../TodoItem/TodoItem';
import { useEffect, useState } from 'react';
import { Todo, CompletedTodo, List, toDoList } from '../../commons/types';
import AddTask from '../AddTask/AddTask';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

export default function ToDo() {
  const [list, setList] = useState<List>({ items: [], completed: false });
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/todos/'
        );

        setTimeout(
          () => setList({ items: response.data, completed: false }),
          1000
        );
      } catch (error) {
        console.log(error);
        setList({ items: toDoList, completed: false });
      }
    };

    fetchToDos();
  }, []);

  const toggleTodo = (todo: Todo): void => {
    // Muda apenas o done do item clicado
    const newList = list.items.map((listItem) => {
      if (listItem.id === todo.id) {
        return { ...listItem, done: !todo.done };
      }

      return listItem;
    });

    // Recebe somente a prop done de todos os itens da lista
    const checks = newList.map((item) => item.done);

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
    } else if (allEqual && newList[0].done === false) {
      setList({ completed: false, items: newList });
    } else if (!allEqual) {
      setList({ completed: false, items: newList });
    }
  };

  function checkAll(todos: readonly Todo[]): CompletedTodo[] {
    return todos.map((todo) => ({
      ...todo,
      done: true,
    }));
  }

  function uncheckAll(todos: readonly Todo[]): Todo[] {
    return todos.map((todo) => ({
      ...todo,
      done: false,
    }));
  }

  function placeToString(place: string): string {
    if (place === 'home') {
      return '🏡 Home';
    } else if (place === 'work') {
      return '💻 Work';
    } else {
      return '📌 ' + place;
    }
  }

  const toggleShowAddTask = (): void => {
    setPath('');
  };

  const handleTaskAdd = (text: string, place: any, done: boolean): void => {
    let newList = list;

    const newItemID = newList.items[newList.items.length - 1].id + 1;

    newList.items.push({
      id: newItemID,
      title: text,
      done: done,
      place: place.value,
    });
    setList(newList);
    toggleShowAddTask();
  };

  return (
    <StyledToDo className={`${list.items.length === 0 && 'loading'}`}>
      {list.items.length > 0 ? (
        <>
          <ul data-testid='ToDo-list'>
            {list.items.map((todo) => (
              <TodoItem
                item={todo}
                toggleTodo={toggleTodo}
                placeToString={placeToString}
                key={todo.id}
              />
            ))}
          </ul>

          <button
            onClick={() =>
              list.completed
                ? setList({
                    items: uncheckAll(list.items),
                    completed: !list.completed,
                  })
                : setList({
                    items: checkAll(list.items),
                    completed: !list.completed,
                  })
            }
          >
            {list.completed && 'Marcar todas como incompletas'}
            {!list.completed && 'Marcar todas como completas'}
          </button>
        </>
      ) : (
        <ThreeDots color='#ffd4c6' height={80} width={80} />
      )}

      <div className='ToDo-add' onClick={() => setPath('newTask')}>
        <span>+</span> Adicionar nova task
      </div>

      {path === 'newTask' && (
        <AddTask toggleShow={toggleShowAddTask} addTask={handleTaskAdd} />
      )}
    </StyledToDo>
  );
}
