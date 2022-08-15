import axios from 'axios';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { List, Todo, toDoList } from '../commons/types';
import AddTask from '../components/AddTask/AddTask';
import ToDo from '../components/ToDo/ToDo';
import { TodoInfo } from '../components/TodoInfo/TodoInfo';
import { StyledApp } from '../styles';

export const AppRoutes = () => {
  const [list, setList] = useState<List>({ items: [], completed: false });

  const fetchToDos = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/'
      );

      setTimeout(
        () => updateList({ items: response.data, completed: false }),
        1000
      );
    } catch (error) {
      console.log(error);
      updateList({ items: toDoList, completed: false });
    }
  };

  const updateList = (newList: List) => {
    setList(newList);
  };

  const handleTaskAdd = (
    text: string,
    place: any,
    completed: boolean
  ): void => {
    let newList = list;

    const newItemID = newList.items[newList.items.length - 1].id + 1;

    newList.items.push({
      id: newItemID,
      title: text,
      completed: completed,
      place: place.value,
    });
    updateList(newList);
  };

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

    let allEqual: boolean = true;

    for (let i = 0; i < checks.length; i++) {
      for (let k = i + 1; k < checks.length; k++) {
        if (checks[i] !== checks[k]) {
          allEqual = false;
          break;
        }
      }
    }

    if (allEqual && newList[0].completed === true) {
      updateList({ completed: true, items: newList });
    } else if (allEqual && newList[0].completed === false) {
      updateList({ completed: false, items: newList });
    } else if (!allEqual) {
      updateList({ completed: false, items: newList });
    }
  };

  return (
    <Routes>
      <Route
        path='/home'
        element={
          <StyledApp>
            <h1>To-do list 📝</h1>
            <ToDo
              list={list}
              updateList={updateList}
              fetchToDos={fetchToDos}
              toggleTodo={toggleTodo}
            />
          </StyledApp>
        }
      />

      <Route
        path='/home/add-task'
        element={
          <>
            <StyledApp>
              <h1>To-do list 📝</h1>
              <ToDo
                list={list}
                updateList={updateList}
                fetchToDos={fetchToDos}
                toggleTodo={toggleTodo}
              />
            </StyledApp>
            <AddTask addTask={handleTaskAdd} />
          </>
        }
      />

      <Route
        path='/home/todo/:todoID'
        element={
          <>
            <StyledApp>
              <h1>To-do list 📝</h1>
              <ToDo
                list={list}
                updateList={updateList}
                fetchToDos={fetchToDos}
                toggleTodo={toggleTodo}
              />
            </StyledApp>
            <TodoInfo
              todoList={list}
              updateList={updateList}
              toggleTodo={toggleTodo}
            />
          </>
        }
      />

      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};
