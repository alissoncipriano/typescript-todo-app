import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { List } from '../commons/types';
import AddTask from '../components/AddTask/AddTask';
import ToDo from '../components/ToDo/ToDo';
import { StyledApp } from '../styles';

export const AppRoutes = () => {
  const [list, setList] = useState<List>({ items: [], completed: false });

  const updateList = (newList: List) => {
    setList(newList);
  };

  const handleTaskAdd = (text: string, place: any, done: boolean): void => {
    let newList = list;

    const newItemID = newList.items[newList.items.length - 1].id + 1;

    newList.items.push({
      id: newItemID,
      title: text,
      done: done,
      place: place.value,
    });
    updateList(newList);
  };

  return (
    <Routes>
      <Route
        path='/home'
        element={
          <StyledApp>
            <h1>To-do list 📝</h1>
            <ToDo list={list} updateList={updateList} />
          </StyledApp>
        }
      />

      <Route
        path='/home/add-task'
        element={
          <>
            <StyledApp>
              <h1>To-do list 📝</h1>
              <ToDo list={list} updateList={updateList} />
            </StyledApp>
            <AddTask addTask={handleTaskAdd} />
          </>
        }
      />

      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};
