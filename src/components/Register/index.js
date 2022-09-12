import React from "react";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import IntlCurrencyInput from "react-intl-currency-input";

import UserContext from "../../contexts/UserContext";
import { Container, Head, StyledForm, StyledLink, Loading } from "../Register/style";

export default function Register(){

    const { user } = useContext(UserContext);
    const { pathname } = useLocation();
    const [ registerOperation, registerType] = handlePathname(pathname);
    const [ newRegister, setNewRegister ] = useState({userId: '', type:'', name:'', value:0});
    const [ loading, setLoading ] = useState(false);
    
    const currencyConfig = {
        locale: "pt-BR",
        formats: {
          number: {
            BRL: {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          },
        },
      };

    function handlePathname(pathname){
        let arr = pathname.split('/');
        arr[1] = arr[1][0].toUpperCase() + arr[1].slice(1);
        arr[2] = arr[2].replace('i','í');
        return [arr[1], arr[2]]
    }



    async function handleNewRegister(e) {

        e.preventDefault();

/*         if(newUser.password.length < 6){
            alert('Por favor insira uma senha com 6 caracteres ou mais');
            setNewUser({...newUser, password:'', passwordConfirmation:''});
            return;
        }

        if(newUser.password !== newUser.passwordConfirmation){
            alert('Por favor verifique a confirmação da senha');
            setNewUser({...newUser, passwordConfirmation:''});
            return;
        } */

        setLoading(true);

        await setTimeout(() => setLoading(false), 2000)

/*         try {
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
        } */
    }


    return (
        <Container>

            <Head>
                <h1>{registerOperation} {registerType}</h1>
            </Head>


            <StyledForm onSubmit={handleNewRegister}>
                <input
                    type='number'
                    step='.01'
                    value={newRegister.value}
                    onChange={e => setNewRegister({ ...newRegister, value: e.target.value })}
                    placeholder='Valor'
                    required
                    disabled={loading}
                />
                <input
                    type='text'
                    value={newRegister.name}
                    onChange={e => setNewRegister({ ...newRegister, name: e.target.value })}
                    placeholder='Descrição'
                    required
                    disabled={loading}
                />
                <button type='submit' disabled={loading}>
                    {loading === false ? 'Salvar ' + registerType: <Loading/>}
                </button>
            </StyledForm>

            <StyledLink to={'/historico'}>
                Cancelar
            </StyledLink>
            
        </Container>
    )
}