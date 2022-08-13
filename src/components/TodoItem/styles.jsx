import styled from 'styled-components';

export const StyledTodoItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;

  &:not(:first-child) {
    margin-top: 22px;
  }

  input {
    transform: scale(1.2);
    margin-top: 8px;
  }

  label {
    margin-left: 5px;
    margin-right: auto;
    font-size: 1.5em;
  }

  input,
  label {
    cursor: pointer;
  }

  span {
    padding: 10px;
    border-radius: 7px;
    border: 2px solid #f0d3ca;
    display: block;
    margin-left: 40px;
    background-color: #fbf7f6;
  }
`;
