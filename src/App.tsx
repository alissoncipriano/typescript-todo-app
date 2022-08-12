import styled from 'styled-components';
import ToDo from './components/ToDo/ToDo';

function App() {
  return (
    <StyledApp>
      <h1>To-do list 📝</h1>
      <ToDo />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fef5dd;

  h1,
  h2 {
    color: #511c0f;
  }

  h1 {
    margin-top: -5em;
  }
`;

export default App;
