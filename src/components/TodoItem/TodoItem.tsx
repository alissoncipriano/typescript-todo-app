import { Todo } from '../../commons/types';
import { StyledTodoItem } from './styles';

interface TodoItemProps {
  item: Todo;
  toggleTodo: (item: Todo) => void;
  placeToString: (place: string) => string;
}

const TodoItem = ({ item, toggleTodo, placeToString }: TodoItemProps) => {
  return (
    <StyledTodoItem>
      <input
        type='checkbox'
        id={`item_${item.id}`}
        onChange={() => toggleTodo(item)}
        checked={item.done}
      />

      <label htmlFor={`item_${item.id}`}>{item.text}</label>

      {item.place && <span>{placeToString(item.place)}</span>}
    </StyledTodoItem>
  );
};

export { TodoItem };
