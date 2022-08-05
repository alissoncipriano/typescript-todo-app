import React, { useState } from 'react';
import './AddTask.css';
import { Place, places } from '../../consts/types';
import CreatableSelect from 'react-select/creatable';

interface AddTaskProps {
  toggleShow: () => void
  addTask: (text: string, place: string, done: boolean) => void
}

export default function AddTask({ toggleShow, addTask }: AddTaskProps) {
  const [selected, setSelected] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [local, setLocal] = useState<string>('');

  const handleFocusEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    setSelected(true);
  };

  const handleSelectorChange = (value: any) => {
    setLocal(value);
  }

  const handleBlurEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    if (name.length <= 0) setSelected(false);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <div className='AddTask'>
      <div className='AddTask-window'>
        <h2>Adicionar task <span>+</span></h2>
    
        <div className={`AddTask-inputText ${selected ? 'selected' : ''}`}>
          <label htmlFor="nome">Nome da task:</label>
          <input type="text" id="nome" value={name} onChange={handleNameChange} onFocus={handleFocusEvent} onBlur={handleBlurEvent} />
        </div>

        <div className='AddTask-inputCheck'>
          <input type="checkbox" id="check" />
          <label htmlFor='check'>Completa</label>
        </div>

        <div className='AddTask-inputSelect'>
          <label htmlFor='check'>Local de realização da task:</label>
          <CreatableSelect
              isClearable
              onChange={(value) => handleSelectorChange(value)}
              options={places}
              className='AddTask-selector' />
        </div>

        <button
          className='AddTask-button AddTask-add'
          onClick={() => addTask(name, local, selected)}
        >
          Adicionar
        </button>
        
        <button
          className='AddTask-button AddTask-cancel'
          onClick={toggleShow}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}