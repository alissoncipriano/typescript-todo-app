import axios from 'axios';
import { CompletedTodo, List, Todo } from '../commons/types';

export const fetchToDos = async () => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/'
    );

    return { items: response.data, completed: false };
  } catch (error) {
    console.error(error);
    return false;
  }
};

export function checkAll(todos: readonly Todo[]): CompletedTodo[] {
  return todos.map((todo) => ({
    ...todo,
    completed: true,
  }));
}

export function uncheckAll(todos: readonly Todo[]): Todo[] {
  return todos.map((todo) => ({
    ...todo,
    completed: false,
  }));
}

export function placeToString(place: string): string {
  if (place === 'home') {
    return '🏡 Home';
  } else if (place === 'work') {
    return '💻 Work';
  } else {
    return '📌 ' + place;
  }
}

export const handleTaskAdd = (
  text: string,
  place: any,
  completed: boolean,
  list: List
): List => {
  const newItemID = list.items[list.items.length - 1].id + 1;

  list.items.push({
    id: newItemID,
    title: text,
    completed: completed,
    place: place.value,
  });
  return list;
};
