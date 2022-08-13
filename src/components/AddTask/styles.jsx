import styled from 'styled-components';

export const StyledAddTask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #b3ada09e;
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;

  .AddTask-window {
    min-width: 300px;
    min-height: 500px;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 10px;
    border: 2px solid #ffd4c6;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background-color: #f7f2e8;
      border: 1px solid #f4d4cc;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;

      span {
        margin-left: 10px;
        font-size: 1.5em;
        margin-top: -5px;
      }
    }

    form {
      min-width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .AddTask-inputText {
        width: 100%;
        margin-top: 25px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        cursor: pointer;

        &.selected > label:nth-child(1) {
          transform: translateY(-25px);
          color: #4f3c36;
        }

        label {
          position: absolute;
          z-index: 1;
          top: 14px;
          left: 5%;
          color: #957d75;
          cursor: pointer;
          transition: 0.2s all ease-in-out;
        }

        input {
          width: 100%;
          padding: 15px;
          box-sizing: border-box;
          background-color: #fbf7f6;
          border: 1px solid #eadfdb;
          border-radius: 10px;
          color: #42312b;
          opacity: 0.8;
          transition: 0.1s all ease-in-out;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }

      .AddTask-inputCheck {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 25px;
        align-self: flex-start;

        input,
        label {
          cursor: pointer;
        }

        label {
          margin-left: 5px;
        }
      }

      .AddTask-inputSelect {
        width: 98%;
        text-align: start;
        margin-top: 25px;

        .AddTask-selector {
          margin-top: 10px;

          &.css-b62m3t-container div.css-1s2u09g-control {
            background-color: hsl(15, 33.3%, 97.6%);
            border-color: hsl(15, 26.1%, 91%);
            cursor: pointer;
          }
        }
      }

      button {
        display: flex;
        align-items: center;
        width: 84%;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #dbc1b8;
        border-radius: 10px;
        color: #866257;
        opacity: 0.8;
        transition: 0.1s all ease-in-out;
        cursor: pointer;
        justify-content: center;
        font-weight: 800;
        font-size: 1.1em;
        position: absolute;

        &:hover {
          opacity: 1;
        }

        &.AddTask-add {
          background-color: #f9dfd8;
          bottom: 100px;

          &:disabled {
            cursor: inherit;
            pointer-events: none;
            opacity: 0.5;
          }
        }

        &.AddTask-cancel {
          background-color: #fff;
          bottom: 30px;
        }
      }
    }
  }
`;
