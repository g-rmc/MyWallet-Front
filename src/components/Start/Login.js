import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

//import {  } from "../../services/mywallet";
import { Container, StyledForm } from "./style";

export default function Login(){

    return (
        <Container>
            <h1>MyWallet</h1>
            <StyledForm>
                <input
                    type='email'
                    placeholder='E-mail'
                    required
                />
                <input
                    type='password'
                    placeholder='Senha'
                    required
                />
                <button>Entrar</button>
            </StyledForm>
            <a>Primeira vez? Cadastre-se!</a>
        </Container>
    )
}