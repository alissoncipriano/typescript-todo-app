import { StyledToDo } from './styles';
import { TodoItem } from '../TodoItem/TodoItem';
import { useEffect } from 'react';
import { Todo, CompletedTodo, List } from '../../commons/types';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

interface ToDoProps {
  list: List;
  updateList: (newList: List) => void;
  fetchToDos: () => void;
  toggleTodo: (todo: Todo) => void;
}

export default function ToDo({
  list,
  updateList,
  fetchToDos,
  toggleTodo,
}: ToDoProps) {
  const navigate = useNavigate();

  useEffect(() => {
    fetchToDos();
  }, []);

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
