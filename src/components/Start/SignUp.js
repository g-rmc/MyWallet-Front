import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import { postNewUser } from "../../services/mywallet";
import { Container, StyledForm, StyledLink, Loading } from "./style";

export default function SignUp(){

    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState({name:'', email:'', password:'', passwordConfirmation:''});
    const navigate = useNavigate();

    async function handleSignUp(e) {

        e.preventDefault();

        if(newUser.password.length < 6){
            alert('Por favor insira uma senha com 6 caracteres ou mais');
            setNewUser({...newUser, password:'', passwordConfirmation:''});
            return;
        }

        if(newUser.password !== newUser.passwordConfirmation){
            alert('Por favor verifique a confirmação da senha');
            setNewUser({...newUser, passwordConfirmation:''});
            return;
        }

        setLoading(true);

        try {
            await postNewUser(newUser);
            alert('Usuário cadastrado com sucesso!');
            navigate('/');
        } catch (error) {
            if (error.response.status === 409){
                alert ('Email já cadastrado!')
            } else {
                alert (`Vish... Erro ${error.response.status}: ${error.response.data}!`)
            }
            setLoading(false);
        }
    }

    return (
        <Container>

            <h1 onClick={() => navigate('/')}>MyWallet</h1>

            <StyledForm onSubmit={handleSignUp}>
                <input
                    type='name'
                    value={newUser.name}
                    onChange={e => setNewUser({...newUser, name:e.target.value})}
                    placeholder='Nome'
                    required
                    disabled={loading}
                />
                <input
                    type='email'
                    value={newUser.email}
                    onChange={e => setNewUser({...newUser, email:e.target.value})}
                    placeholder='E-mail'
                    required
                    disabled={loading}
                />
                <input
                    type='password'
                    value={newUser.password}
                    onChange={e => setNewUser({...newUser, password:e.target.value})}
                    placeholder='Senha'
                    required
                    disabled={loading}
                />
                <input
                    type='password'
                    value={newUser.passwordConfirmation}
                    onChange={e => setNewUser({...newUser, passwordConfirmation:e.target.value})}
                    placeholder='Confirme a senha'
                    required
                    disabled={loading}
                />
                <button type='submit' disabled={loading}>
                    {loading === false ? 'Cadastrar' : <Loading/>}
                </button>
            </StyledForm>

            <StyledLink to={loading === false? '/' : ''}>
                Já tem uma conta? Entre agora!
            </StyledLink>

        </Container>
    )
}