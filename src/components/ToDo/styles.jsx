import styled from 'styled-components';

export const StyledToDo = styled.div`
  min-width: 370px;
  max-width: 520px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #ffd4c6;

  div:not(.ToDo-add) {
    justify-content: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    padding-right: 20px;
    padding-top: 18px;
    max-height: 28vh;
    overflow-y: auto;

    label {
      text-align: start;
    }
  }

  button {
    float: left;
    margin-top: 30px;
    background: unset;
    border: none;
    color: #806538;
    font-size: 1em;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #5c451f;
      background-color: #3321040f;
    }
  }

  .ToDo-add {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 65px;
    padding: 15px;
    box-sizing: border-box;
    background-color: #fbf7f6;
    border: 1px solid #eadfdb;
    border-radius: 10px;
    color: #8a7872;
    opacity: 0.8;
    transition: 0.5s margin ease-in-out;
    cursor: pointer;

    &:hover {
      opacity: 1;
      background-color: #f8f4f3;
      border-color: #eadfdb;
      color: #511c0f;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      border: 2px solid #d2d2d2;
      font-weight: 800;
      border-radius: 5px;
      background-color: #d2d2d2;
      color: #fbf8f7;
      font-size: 1.5em;
      padding: 1px 9px 3px 9px;
    }
  }

  &.loading .ToDo-add {
    margin-top: 0;
  }
`;