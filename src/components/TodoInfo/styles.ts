import styled from 'styled-components';

export const StyledTodoInfo = styled.div`
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

  .TodoInfo-window {
    min-width: 45vw;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 10px;
    border: 2px solid #ffd4c6;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
      width: 100%;
      padding-bottom: 12em;
      display: flex;
      flex-direction: column;
      align-items: center;

      .TodoInfo-inputText {
        width: 100%;
        margin-top: 45px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        cursor: pointer;

        label {
          position: absolute;
          z-index: 1;
          top: 14px;
          left: 2%;
          color: #957d75;
          transition: 0.2s all ease-in-out;
        }

        input,
        textarea {
          width: 100%;
          padding: 15px;
          box-sizing: border-box;
          background-color: #fbf7f673;
          border: 1px solid #eadfdb;
          border-radius: 10px;
          color: #42312b;
          opacity: 0.8;
          transition: 0.1s all ease-in-out;

          &:focus {
            outline: none;
          }
        }

        &.selected {
          label {
            transform: translateY(-25px);
            color: #4f3c36;
          }

          button {
            opacity: 1;
            pointer-events: all;
          }
        }

        &.TodoInfo-inputDescription {
          align-items: center;

          &.selected {
            textarea {
              padding-bottom: 83px;
            }

            div {
              opacity: 1;
              pointer-events: all;

              button {
                opacity: 1;
                pointer-events: all;
              }
            }
          }

          div {
            position: absolute;
            width: 95%;
            height: 69px;
            bottom: 1px;
            left: 1px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            background-color: #fdfcfc;
            z-index: 1000;
            padding-left: 25px;
            box-sizing: border-box;
            border-radius: 0 0 20px 20px;
            opacity: 0;
            pointer-events: none;

            button {
              position: relative;
              width: 100px;
              height: 5px;
              background-color: #fff;
              opacity: 0;
              margin-bottom: 18px;
              pointer-events: none;
              transition: 0.1s all ease-in-out;
            }
          }

          &.confirmed {
            textarea {
              padding-bottom: 0;
            }

            div {
              opacity: 0;
              pointer-events: none;
            }
          }
        }
      }

      .TodoInfo-inputCheck {
        align-self: flex-start;
        margin-top: 25px;
      }

      .TodoInfo-inputSelect {
        width: 98%;
        text-align: start;
        margin-top: 25px;

        .TodoInfo-selector {
          margin-top: 10px;

          .list__control {
            background-color: hsl(15, 33.3%, 97.6%);
            border-color: hsl(15, 26.1%, 91%);
            cursor: pointer;
          }
        }
      }

      button {
        display: flex;
        align-items: center;
        width: 93%;
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

        &.TodoInfo-add {
          background-color: #f9dfd8;
          bottom: 100px;

          &:disabled {
            cursor: inherit;
            pointer-events: none;
            opacity: 0.5;
          }
        }

        &.TodoInfo-cancel {
          background-color: #fff;
          bottom: 30px;
        }
      }
    }
  }
`;
