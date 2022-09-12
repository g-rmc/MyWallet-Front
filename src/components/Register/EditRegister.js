import React from "react";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IntlCurrencyInput from "react-intl-currency-input";

import UserContext from "../../contexts/UserContext";
import { postNewRegister, getRegisterById, editRegisterById } from "../../services/mywallet";
import { Container, Head, StyledForm, StyledLink, Loading } from "./style";

export default function AddRegister(){

    const { user, config } = useContext(UserContext);
    const { pathname } = useLocation();
    const [ registerOperation, registerType, registerId] = handlePathname(pathname);
    const [ editedRegister, setEditedRegister ] = useState({name:'', value:0});
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();
    
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

    useEffect(() => {
        if (user === ''){
            navigate('/');
            if (localStorage.getItem('MyWalletUser') === null) {
                alert ('Por favor, faça o login novamente')
            }
        }
    },[])

    useEffect(() => {
        if (registerType !== 'entrada' && registerType !== 'saída'){
            navigate('/historico');
        }
    },[])

    useEffect(() => {
        const promise = getRegisterById(registerId, config);

        promise.then((resp) => {
                setEditedRegister({name: resp.data.name, value: resp.data.value});
            })
            .catch((err) => {
                console.log(err);
            });
    },[])

    function handlePathname(pathname){
        let arr = pathname.split('/');
        arr[1] = arr[1][0].toUpperCase() + arr[1].slice(1);
        arr[2] = arr[2].replace('i','í');
        return [arr[1], arr[2], arr[3]]
    }

    function handleChange(event, value, maskedValue) {
        event.preventDefault();
        setEditedRegister({ ...editedRegister, value });
    };

    async function handleEditedRegister(e) {

        e.preventDefault();

        if(editRegisterById.value === 0){
            alert('Por favor insira um valor para o registro');
            return;
        }

        setLoading(true);

        try {
            await editRegisterById(registerId, editedRegister, config);
            navigate('/historico');
        } catch (error) {
            alert (`Vish... Erro ${error.response.status}: ${error.response.data}!`)
        }

        setLoading(false);
    }

    return (
        <Container>

            <Head>
                <h1>{registerOperation} {registerType}</h1>
            </Head>


            <StyledForm onSubmit={handleEditedRegister}>
                <IntlCurrencyInput
                    currency="BRL"
                    value={Number(editedRegister.value)}
                    config={currencyConfig}
                    onChange={handleChange} 
                    required
                    disabled={loading}
                    max={999999.99}
                />
                <input
                    type='text'
                    value={editedRegister.name}
                    onChange={e => setEditedRegister({ ...editedRegister, name: e.target.value })}
                    placeholder='Descrição'
                    required
                    disabled={loading}
                />
                <button type='submit' disabled={loading}>
                    {loading === false ? 'Atualizar ' + registerType: <Loading/>}
                </button>
            </StyledForm>

            <StyledLink to={'/historico'}>
                Cancelar
            </StyledLink>
            
        </Container>
    )
}