import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

//import {  } from "../../services/mywallet";
import { Container, StyledForm } from "./style";

export default function Register(){

    return (
        <Container>
            <h1>MyWallet</h1>
            <StyledForm>
                <input
                    type='name'
                    placeholder='Nome'
                    required
                />
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
                <input
                    type='password'
                    placeholder='Confirme a senha'
                    required
                />
                <button>Cadastrar</button>
            </StyledForm>
            <a>Primeira vez? Cadastre-se!</a>
        </Container>
    )
}