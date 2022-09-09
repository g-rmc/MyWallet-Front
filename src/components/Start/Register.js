import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import { postRegister } from "../../services/mywallet";
import { Container, StyledForm, StyledLink, Loading } from "./style";

export default function Register(){

    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState({name:'', email:'', password:'', passwordConfirmation:''});
    const navigate = useNavigate();

    async function handleRegister(e) {

        e.preventDefault();

        if(register.password.length < 6){
            alert('Por favor insira uma senha com 6 caracteres ou mais');
            setRegister({...register, password:'', passwordConfirmation:''});
            return;
        }

        if(register.password !== register.passwordConfirmation){
            alert('Por favor verifique a confirmação da senha');
            setRegister({...register, passwordConfirmation:''});
            return;
        }

        setLoading(true);

        try {
            await postRegister(register);
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

            <StyledForm onSubmit={handleRegister}>
                <input
                    type='name'
                    value={register.name}
                    onChange={e => setRegister({...register, name:e.target.value})}
                    placeholder='Nome'
                    required
                    disabled={loading}
                />
                <input
                    type='email'
                    value={register.email}
                    onChange={e => setRegister({...register, email:e.target.value})}
                    placeholder='E-mail'
                    required
                    disabled={loading}
                />
                <input
                    type='password'
                    value={register.password}
                    onChange={e => setRegister({...register, password:e.target.value})}
                    placeholder='Senha'
                    required
                    disabled={loading}
                />
                <input
                    type='password'
                    value={register.passwordConfirmation}
                    onChange={e => setRegister({...register, passwordConfirmation:e.target.value})}
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