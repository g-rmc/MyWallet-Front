import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyle from '../styles/globalStyles';
import UserContext from '../contexts/UserContext';

//import COMPONENTE from '/componentes';

export default function App() {

  const [user, setUser] = useState('');

  //const config = {headers: {Authorization: `Bearer ${user.tojen}`}};

  return (
    <>
      <GlobalStyle />

      <UserContext.Provider value={{
        user, setUser
      }}>

        <Container>
          <BrowserRouter>
            <Routes>

              <Route path='/' element={<h1>Olar</h1>}/>

            </Routes>
          </BrowserRouter>
        </Container>
      </UserContext.Provider>
    </>
  );
}

const Container = styled.div`
  background-color: #8C11BE;
  width: 100%;
  min-width: 300px;
  max-width: 600px;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`