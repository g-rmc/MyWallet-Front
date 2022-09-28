import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

import { postNewUser } from "../../services/mywallet";
import { Container, StyledForm, StyledLink, StyledValidationBox, Loading } from "./style";

export default function SignUp(){

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState({name:'', email:'', password:'', passwordConfirmation:''});
    
    const [validateLength, setValidateLength] = useState(false);
    const [validateNumbers, setValidateNumbers] = useState(false);
    const [validateUpperCase, setValidateUpperCase] = useState(false);
    const [validateSymbols, setValidadeSymbols] = useState(false);
    const [validateConfirmation, setValidateConfirmation] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    async function handleSignUp(e) {

        e.preventDefault();

        if(validateLength || validateNumbers || validateUpperCase || validateSymbols || validateConfirmation){
            alert('Senha inválida');
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

    function validatePassword(e) {
        e.preventDefault();
        const password = e.target.value;

        setValidateLength(password.length >= 6);
        setValidateNumbers(password.match(/\d+/) !== null);
        setValidateUpperCase(password.match(/[A-Z]/) !== null);
        setValidadeSymbols(password.match(/[^A-Z a-z 0-9]/) !== null);
        setValidateConfirmation(password === newUser.passwordConfirmation);
    }

    function validatePasswordConfirmation(e){
        e.preventDefault();
        const confirmPassword = e.target.value;
        setValidateConfirmation(confirmPassword === newUser.password);
    }

    function ValidationBox() {
        return (
            <StyledValidationBox>
                {showPassword?
                    <h2 onClick={() => setShowPassword(false)}><AiOutlineEye/></h2> :
                    <h2 onClick={() => setShowPassword(true)}><AiOutlineEyeInvisible/></h2>
                }

                <h3 style={validateLength? { color: "lightgreen" } : { color: "red" }}>• Possui 6 caractéres ou mais</h3>
                <h3 style={validateNumbers? { color: "lightgreen" } : { color: "red" }}>• Possui números</h3>
                <h3 style={validateUpperCase? { color: "lightgreen" } : { color: "red" }}>• Possui letras maiúsculas</h3>
                <h3 style={validateSymbols? { color: "lightgreen" } : { color: "red" }}>• Possui caractéres especiais</h3>

            </StyledValidationBox>
        )
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
                    type={showPassword? 'text' : 'password'}
                    value={newUser.password}
                    onChange={e => {
                        setNewUser({...newUser, password:e.target.value});
                        validatePassword(e);
                    }}
                    placeholder='Senha'
                    required
                    disabled={loading}
                />

                {newUser.password.length === 0?
                <></> :
                <ValidationBox />
                }

                <input
                    type={showPassword? 'text' : 'password'}
                    value={newUser.passwordConfirmation}
                    onChange={e => {
                        setNewUser({...newUser, passwordConfirmation:e.target.value});
                        validatePasswordConfirmation(e);
                    }}
                    placeholder='Confirme a senha'
                    required
                    disabled={loading}
                />

                {newUser.password.length === 0?
                <></> :
                <StyledValidationBox>
                    <h3 style={validateConfirmation? { color: "lightgreen" } : { color: "red" }}>• As senhas conferem</h3>
                </StyledValidationBox>
                }

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