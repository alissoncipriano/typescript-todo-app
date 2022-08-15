import axios from 'axios';
import { useEffect, useState } from 'react';
import { places } from '../../commons/types';
import { useNavigate, useParams } from 'react-router-dom';
import { List, Todo, toDoList } from '../../commons/types';
import CreatableSelect from 'react-select/creatable';
import { StyledTodoInfo } from './styles';
import { useRef } from 'react';

interface ITodoInfoProps {
  todoList: List;
  updateList: (newList: List) => void;
  toggleTodo: (todo: Todo) => void;
}

export const TodoInfo = ({
  todoList,
  updateList,
  toggleTodo,
}: ITodoInfoProps) => {
  let { todoID } = useParams();
  const [item, setItem] = useState<Todo>({
    id: -1,
    title: '',
    done: false,
    place: '',
  });

  const [descriptionInput, setDescriptionInput] = useState(false);
  const [description, setDescription] = useState('');
  const descricao = useRef<HTMLTextAreaElement>(null);
  const descriptionContainer = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const itemID: number = parseInt(todoID!);

  const fetchToDos = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/'
      );

      let _item = response.data.filter(
        (x: { id: number }) => x.id === itemID
      )[0];

      delete Object.assign(_item, { ['done']: _item['completed'] })[
        'completed'
      ];

      setItem(_item);
      delete _item.userId;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectorChange = (value: any) => {
    let newItem = item;
    newItem.place = value.value;

    setItem(newItem);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newItem = item;
    newItem.title = e.target.value;

    setItem(newItem);
  };

  const handleDoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newItem = item;
    newItem.done = e.target.checked;

    toggleTodo(item);
  };

  const handleTaskEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newList: List = todoList;

    let elIndex = newList.items.findIndex((el) => el.id == itemID);

    newList.items[elIndex] = item;

    updateList(newList);
    navigate('/home');
  };

  const handleDescriptionBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 0) setDescriptionInput(false);
  };

  const handleDescriptionConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    let newItem = item;
    newItem.description = description;

    setItem(newItem);

    descriptionContainer.current?.classList.add('confirmed');
    descricao.current && descricao.current.blur();
  };

  useEffect(() => {
    if (todoList.items.length > 0) {
      let _item = todoList.items.filter(
        (x: { id: number }) => x.id === itemID
      )[0];

      setItem(_item);
    } else {
      fetchToDos();
    }
  }, []);

  if (item.id !== -1)
    return (
      <StyledTodoInfo>
        <div className='TodoInfo-window'>
          <form onSubmit={(e) => handleTaskEdit(e)}>
            <div className='TodoInfo-inputText TodoInfo-nome selected'>
              <label htmlFor='nome'>Nome da task:</label>

              <input
                type='text'
                id='nome'
                name='nome'
                defaultValue={item.title}
                onChange={handleNameChange}
              />
            </div>

            <div
              className={`TodoInfo-inputText TodoInfo-inputDescription ${
                descriptionInput ||
                (item.description && item.description.length > 0)
                  ? 'selected'
                  : ''
              }`}
              ref={descriptionContainer}
            >
              <label htmlFor='descricao'>Descrição:</label>

              <textarea
                id='descricao'
                name='descricao'
                rows={4}
                ref={descricao}
                defaultValue={item.description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => {
                  setDescriptionInput(true);
                }}
                onBlur={(e) => handleDescriptionBlur(e)}
              />
              <div>
                <button onClick={(e) => handleDescriptionConfirm(e)}>Ok</button>
              </div>
            </div>

            <div className='TodoInfo-inputCheck'>
              <input
                type='checkbox'
                id='check'
                name='check'
                defaultChecked={item.done}
                onChange={(e) => handleDoneChange(e)}
              />

              <label htmlFor='check'>Completa</label>
            </div>

            <div className='TodoInfo-inputSelect'>
              <label htmlFor='local'>Local de realização da task:</label>

              <CreatableSelect
                isClearable
                inputId='local'
                onChange={(value) => handleSelectorChange(value)}
                options={places}
                name='local'
                defaultInputValue={item.place}
                className='TodoInfo-selector'
                classNamePrefix='list'
              />
            </div>

            <button
              type='submit'
              className='TodoInfo-add'
              disabled={item.title.length > 0 ? false : true}
            >
              Atualizar
            </button>

            <button
              className='TodoInfo-cancel'
              onClick={() => navigate('/home')}
            >
              Voltar
            </button>
          </form>
        </div>
      </StyledTodoInfo>
    );
  else return <></>;
};
