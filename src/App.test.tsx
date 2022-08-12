import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import selectEvent from 'react-select-event';

test('app is rendered', () => {
  render(<App />);

  const hello = screen.getByText(/To-do list/i);
  expect(hello).toBeInTheDocument();
});

describe('ToDo-list is rendered, has at least one item in there and user can chek/uncheck items', () => {
  test('app list exists', () => {
    render(<App />);
    const listItens = screen.getByTestId('ToDo-list');
    expect(listItens).toBeInTheDocument();
  });

  test('app list has a least one list item', () => {
    render(<App />);
    const listItens = screen.getByTestId('ToDo-list');

    expect(within(listItens).getAllByRole('listitem')).not.toBeNull();
  });

  test('if user can check/uncheck todo itens', () => {
    render(<App />);

    const listItens = screen.getAllByRole('checkbox');

    expect(listItens[0]).not.toBeChecked();

    userEvent.click(listItens[0]);

    expect(listItens[0]).toBeChecked();
  });
});

test('user can check/uncheck all items at once', () => {
  render(<App />);

  const listItens = screen.getAllByRole('checkbox');

  const checkAllButton = screen.getByText(/Marcar todas como completas/i);

  expect(checkAllButton).toBeInTheDocument();

  userEvent.click(checkAllButton);

  expect(listItens[0]).toBeChecked();

  expect(checkAllButton).toHaveTextContent(/Marcar todas como incompletas/i);

  userEvent.click(checkAllButton);

  expect(listItens[0]).not.toBeChecked();
});

test('user can display add new item window', () => {
  render(<App />);

  const addNewItem = screen.getByText(/adicionar nova task/i);

  userEvent.click(addNewItem);

  const addItemWindow = screen.getByTestId('AddTask');

  expect(addItemWindow).toBeInTheDocument();
});

test('user can add a new to-do item', async () => {
  render(<App />);

  const addNewItem = screen.getByText(/adicionar nova task/i);

  userEvent.click(addNewItem);

  const taskName = screen.getByRole('textbox', { name: /nome da task:/i });
  const taskStatus = screen.getByTestId('AddTask-check');
  const addTaskButton = screen.getByRole('button', { name: /adicionar/i });

  fireEvent.change(taskName, { target: { value: 'Task teste' } });
  fireEvent.click(taskStatus);

  expect(taskName).toHaveValue('Task teste');
  expect(taskStatus).toBeChecked();

  expect(screen.getByTestId('AddTask-form')).toHaveFormValues({ local: '' });

  await selectEvent.select(
    screen.getByLabelText('Local de realização da task:'),
    ['Home']
  );
  expect(screen.getByTestId('AddTask-form')).toHaveFormValues({
    local: 'home',
  });

  userEvent.click(addTaskButton);

  const taskTeste = screen.getByText(/Task teste/i);
  expect(taskTeste).toBeInTheDocument();
});
