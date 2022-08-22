import { StyledToDo } from './styles';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo, List } from '../../commons/types';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { checkAll, placeToString, uncheckAll } from '..';

interface ToDoProps {
  list: List;
  updateList: (list: List) => void;
  toggleTodo: (todo: Todo) => void;
}

export default function ToDo({ list, updateList, toggleTodo }: ToDoProps) {
  const navigate = useNavigate();

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
            {!list.completed
              ? 'Marcar todas como completas'
              : 'Marcar todas como incompletas'}
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
