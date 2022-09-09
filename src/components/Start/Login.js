import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import { postLogin } from "../../services/mywallet";
import { Container, StyledForm, StyledLink, Loading } from "./style";

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

    async function handleLogin(e) {

        e.preventDefault();
        setLoading(true);

        try {
            const res = await postLogin(login);
            setUser(res.data);
            //localStorage.setItem('MyWalletUser', JSON.stringify(res.data));
            navigate('/historico');
        } catch (error) {
            if (error.response.status === 401){
                alert ('Usuário ou senha inválidos!')
            } else {
                alert (`Vish... Erro ${error.response.status}: ${error.response.data}!`)
            }
            setLoading(false);
        }
    }

    return (
        <Container>
            
            <h1>MyWallet</h1>

            <StyledForm onSubmit={handleLogin}>
                <input
                    type='email'
                    value={login.email}
                    onChange={e => setLogin({...login, email:e.target.value})}
                    placeholder='E-mail'
                    required
                    disabled={loading}
                />
                <input
                    type='password'
                    value={login.password}
                    onChange={e => setLogin({...login, password:e.target.value})}
                    placeholder='Senha'
                    required
                    disabled={loading}
                />
                <button type='submit' disabled={loading}>
                    {loading === false ? 'Entrar' : <Loading/>}
                </button>
            </StyledForm>

            <StyledLink to={loading === false? '/cadastro' : ''}>
                Primeira vez? Cadastre-se!
            </StyledLink>

        </Container>
    )
}