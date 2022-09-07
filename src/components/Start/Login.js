import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

//import {  } from "../../services/mywallet";
import { Container, StyledForm, StyledLink } from "./style";

export default function Login(){

    const [login, setLogin] = useState({email:'', password:''});
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('MyWalletUser') !== null) {
            setUser(JSON.parse(localStorage.getItem('MyWalletUser')));
            navigate('/historico')
        }
    }, []);

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

            <StyledLink to={loading === false? '/cadastro' : ''}>
                Primeira vez? Cadastre-se!
            </StyledLink>

        </Container>
    )
}