import React from "react";
import CurrencyForm from "./CurrencyForm";
import styled from "styled-components";

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  min-height: 100vh;
  flex-direction: row;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

function App() {
  return (
    <ContainerDiv>
      <CurrencyForm />
    </ContainerDiv>
  );
}

export default App;
