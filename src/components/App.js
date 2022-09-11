import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyle from '../styles/globalStyles';
import UserContext from '../contexts/UserContext';

import SignIn from './Start/SignIn';
import SignUp from './Start/SignUp';
import History from './History';
import Register from './Register';

export default function App() {

  const [user, setUser] = useState('');

  const config = {headers: {Authorization: `Bearer ${user.token}`}};

  return (
    <>
      <GlobalStyle />

      <UserContext.Provider value={{
        user, setUser,
        config
      }}>

        <Container>
          <BrowserRouter>
            <Routes>

              <Route path='/' element={<SignIn/>}/>
              <Route path='/cadastro' element={<SignUp/>}/>
              <Route path='/historico' element={<History/>}/>
              <Route path='/adicionar/:tipoRigistro' element={<Register/>}/>
              <Route path='/editar/:idRegistro' element={<Register/>}/>

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