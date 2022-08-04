import './TodoItem.css';
import { Todo } from '../../types';

interface TodoItemProps {
  item: Todo
  toggleTodo: (item: Todo) => void
}

const TodoItem = ({ item, toggleTodo }: TodoItemProps) => {
  return (
    <li className='TodoItem'>
      <input type='checkbox' id={`item_${item.id}`} defaultChecked={item.done} onChange={() => toggleTodo(item)} />
      <label htmlFor={`item_${item.id}`}>{ item.text }</label>
    </li>
  )
}

export { TodoItem };
