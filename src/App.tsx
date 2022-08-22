import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { List, Todo, toDoList } from './commons/types';
import { fetchToDos } from './components';
import { AppRoutes } from './routes/routes';

function App() {
  const [list, setList] = useState<List>({ items: [], completed: false });

  useEffect(() => {
    const fetchData = async () => {
      const toDos: List | false = await fetchToDos();

      if (toDos) setList(toDos);
      else setList({ items: toDoList, completed: false });
    };

    fetchData();
  }, []);

  const toggleTodo = (todo: Todo): void => {
    // Muda apenas o done do item clicado
    const newList = list.items.map((listItem) => {
      if (listItem.id === todo.id) {
        return { ...listItem, completed: !todo.completed };
      }

      return listItem;
    });

    // Recebe somente a prop done de todos os itens da lista
    const checks = newList.map((item) => item.completed);

    if (checks.every((check) => check === true)) {
      setList({ completed: true, items: newList });
      return;
    }
    setList({ completed: false, items: newList });
  };

  return (
    <BrowserRouter>
      <AppRoutes list={list} updateList={setList} toggleTodo={toggleTodo} />
    </BrowserRouter>
  );
}

export default App;
