import './TodoItem.css';
import { Todo } from '../../consts/types';

interface TodoItemProps {
  item: Todo
  toggleTodo: (item: Todo) => void
  placeToString: (place: string) => string
}

const TodoItem = ({ item, toggleTodo, placeToString }: TodoItemProps) => {
  return (
    <li className='TodoItem'>
      <input type='checkbox'
        id={`item_${item.id}`}
        onChange={() => toggleTodo(item)}
        checked={ item.done }
      />

      <label htmlFor={`item_${item.id}`}>{ item.text }</label>

      {
        item.place &&
        <span className='TodoItem-place'>{ placeToString(item.place) }</span>
      }
    </li>
  )
}

export { TodoItem };
