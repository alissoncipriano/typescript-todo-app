import React, { useState } from 'react';
import { places } from '../../commons/types';
import CreatableSelect from 'react-select/creatable';
import { StyledAddTask } from './styles';

interface AddTaskProps {
  toggleShow: () => void;
  addTask: (text: string, place: string, done: boolean) => void;
}

export default function AddTask({ toggleShow, addTask }: AddTaskProps) {
  const [selected, setSelected] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [local, setLocal] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  const handleFocusEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    setSelected(true);
  };

  const handleBlurEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    if (name.length === 0) setSelected(false);
  };

  const handleSelectorChange = (value: any) => {
    setLocal(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleTaskAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(name, local, checked);
  };

  return (
    <StyledAddTask data-testid='AddTask'>
      <div className='AddTask-window'>
        <h2>
          Adicionar task <span>+</span>
        </h2>
        <form onSubmit={(e) => handleTaskAdd(e)} data-testid='AddTask-form'>
          <div className={`AddTask-inputText ${selected ? 'selected' : ''}`}>
            <label htmlFor='nome'>Nome da task:</label>

            <input
              type='text'
              id='nome'
              name='nome'
              value={name}
              maxLength={25}
              onChange={handleNameChange}
              onFocus={handleFocusEvent}
              onBlur={handleBlurEvent}
            />
          </div>

          <div className='AddTask-inputCheck'>
            <input
              type='checkbox'
              id='check'
              data-testid='AddTask-check'
              name='check'
              onChange={handleCheckChange}
            />

            <label htmlFor='check'>Completa</label>
          </div>

          <div className='AddTask-inputSelect'>
            <label htmlFor='local'>Local de realização da task:</label>

            <CreatableSelect
              isClearable
              inputId='local'
              onChange={(value) => handleSelectorChange(value)}
              options={places}
              name='local'
              className='AddTask-selector'
              classNamePrefix='list'
            />
          </div>

          <button
            type='submit'
            className='AddTask-add'
            disabled={name.length > 0 ? false : true}
          >
            Adicionar
          </button>

          <button className='AddTask-cancel' onClick={toggleShow}>
            Cancelar
          </button>
        </form>
      </div>
    </StyledAddTask>
  );
}
