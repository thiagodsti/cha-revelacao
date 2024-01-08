import { useState } from "react";
import "./App.css";
import styled from "styled-components";

const Layout = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-image: url("bg_inicial.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    padding: 20px;
    height: auto;
  }
`;

function App() {
  return (
    <Layout>
      <a style={{
        backgroundColor: "transparent",
        color: "transparent",
        border: "none",
        cursor: "default",
        position: "absolute",
        top: "0",
        left: "0",
      }} href="/questions">Começar aqui</a>
    </Layout>
  );
}

export default App;
