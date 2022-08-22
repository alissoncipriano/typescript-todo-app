import { Navigate, Outlet, Route, Routes, useRoutes } from 'react-router-dom';
import { List, Todo } from '../commons/types';
import { handleTaskAdd } from '../components';
import AddTask from '../components/AddTask/AddTask';
import ToDo from '../components/ToDo/ToDo';
import { TodoInfo } from '../components/TodoInfo/TodoInfo';
import { StyledApp } from '../styles';

interface RouterProps {
  list: List;
  updateList: (list: List) => void;
  toggleTodo: (todo: Todo) => void;
}

export const AppRoutes = ({ list, updateList, toggleTodo }: RouterProps) => {
  return useRoutes([
    {
      path: '*',
      element: <Navigate to='/home' />,
    },
    {
      path: '/home',
      element: (
        <>
          <StyledApp>
            <h1>To-do list 📝</h1>
            <ToDo list={list} updateList={updateList} toggleTodo={toggleTodo} />
          </StyledApp>
          <Outlet />
        </>
      ),
      children: [
        {
          path: 'add-task',
          element: <AddTask addTask={handleTaskAdd} list={list} />,
        },
        {
          path: 'todo/:todoID',
          element: (
            <TodoInfo
              todoList={list}
              updateList={updateList}
              toggleTodo={toggleTodo}
            />
          ),
        },
      ],
    },
  ]);
};
