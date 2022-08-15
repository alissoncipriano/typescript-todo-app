import { useNavigate } from 'react-router-dom';
import { Todo } from '../../commons/types';
import { StyledTodoItem } from './styles';

interface TodoItemProps {
  item: Todo;
  toggleTodo: (item: Todo) => void;
  placeToString: (place: string) => string;
}

const TodoItem = ({ item, toggleTodo, placeToString }: TodoItemProps) => {
  const navigate = useNavigate();

  return (
    <StyledTodoItem>
      <input
        type='checkbox'
        id={`item_${item.id}`}
        onChange={() => toggleTodo(item)}
        checked={item.done}
      />

      <label onClick={() => navigate('/home/todo/' + item.id)}>
        {item.title}
      </label>

      {item.place && <span>{placeToString(item.place)}</span>}
    </StyledTodoItem>
  );
};

export { TodoItem };
