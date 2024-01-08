import "./App.css";
import styled from "styled-components";

const Layout = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-image: url("background2.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    // Estilos para telas menores (como tablets e smartphones)
    padding: 20px;
    height: auto;
  }
`;

function App() {
  return (
    <Layout>
      <a href="/tictactoe">Começar aqui</a>
    </Layout>
  );
}

export default App;
