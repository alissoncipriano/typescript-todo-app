import { StyledToDo } from './styles';
import { TodoItem } from '../TodoItem/TodoItem';
import { useEffect, useState } from 'react';
import { Todo, CompletedTodo, List, toDoList } from '../../commons/types';
import AddTask from '../AddTask/AddTask';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

interface ToDoProps {
  list: List;
  updateList: (newList: List) => void;
}

export default function ToDo({ list, updateList }: ToDoProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/todos/'
        );

        // navigate('../success');

        setTimeout(
          () => updateList({ items: response.data, completed: false }),
          1000
        );
      } catch (error) {
        console.log(error);
        updateList({ items: toDoList, completed: false });
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
      updateList({ completed: true, items: newList });
    } else if (allEqual && newList[0].done === false) {
      updateList({ completed: false, items: newList });
    } else if (!allEqual) {
      updateList({ completed: false, items: newList });
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
                ? updateList({
                    items: uncheckAll(list.items),
                    completed: !list.completed,
                  })
                : updateList({
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

      <div className='ToDo-add' onClick={() => navigate('/home/add-task')}>
        <span>+</span> Adicionar nova task
      </div>
    </StyledToDo>
  );
}
