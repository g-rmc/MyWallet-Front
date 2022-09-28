import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

import UserContext from "../../contexts/UserContext";

import { AiOutlineLogout, AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai';
import { Container, Head, Body, StyledRegister, StyledText, StyledList, StyledTotal, Footer } from "./style";
import { getRegister, deleteRegister } from '../../services/mywallet';

export default function History(){

    const { user, setUser, config } = useContext(UserContext);
    const [ registerHistory, setRegisterHistory ] = useState([]);
    const [ totalRegister, setTotalRegister ] = useState(0);
    const [ deleted, setDeleted ] = useState(false);
    const navigate = useNavigate();
    let userName;

    useEffect(() => {
        if (user === ''){
            navigate('/');
            if (localStorage.getItem('MyWalletUser') === null) {
                alert ('Por favor, faça o login novamente')
            }
        }
    },[])

    useEffect(() => {
        const promise = getRegister(config);

        promise.then((resp) => {
                resp.data.map(transaction => transaction.value = transaction.value/100);
                setRegisterHistory(resp.data);
                calculateTotal(resp.data);
            })
            .catch((err) => {
                console.log(err);
            })
    },[deleted]);

    if (user.name) {
        userName = user.name.split(' ')[0];
    } else {
        userName = "@"
    }

    function moneyMask (value) {
        value = Math.abs(value).toString();
        const result = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(Number(value));
        return 'R$ ' + result
    }

    function confirmLogout () {
        if (window.confirm('Você realmente deseja fazer logout')){
            localStorage.removeItem('MyWalletUser');
            setUser('');
            navigate('/');
        }
    }

    async function handleDelete (id) {
        if (window.confirm('Você realmente deseja deletar esse registro')){
            try {
                await deleteRegister(id, config);
                setDeleted(!deleted);
            } catch (error) {
                alert (`Vish... Erro ${error.response.status}: ${error.response.data}!`);
            }
        }
    }

    function calculateTotal (arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++){
            if(isNaN(Number(arr[i].value))){
                continue;
            }
            if (arr[i].type === 'positive'){
                sum += Number(arr[i].value)
            } else {
                sum -= Number(arr[i].value)
            }
        }
        setTotalRegister(Number(sum).toFixed(2));
    }

    function Register({register}) {

        let translatedType;

        if (register.type === 'positive') {
            translatedType = 'entrada'
        } else if (register.type === 'negative') {
            translatedType = 'saida'
        };

        return (
            <StyledRegister>
                <StyledText type={'date'}>{dayjs(register.date).format('DD/MM')}</StyledText>
                <StyledText type={'name'} onClick={() => navigate(`/editar/${translatedType}/${register._id}`)}>{register.name}</StyledText>
                <StyledText type={register.type}>{moneyMask(register.value)}</StyledText>
                <StyledText type={'delete'} onClick={() => handleDelete(register._id)}>x</StyledText>
            </StyledRegister>
        )
    }

    return(
        <Container>
            <Head>
                <h1>Olá, {userName}</h1>
                <div onClick={confirmLogout}><AiOutlineLogout/></div>
            </Head>

            <Body>
                {registerHistory.length === 0 ? 
                    <h6>Não há registros de entrada ou saída</h6> : 
                    <div>
                        <StyledList>
                            {registerHistory.map((register, index) => <Register key={index} register={register}/>)}
                        </StyledList>
                        <StyledTotal>
                            <h1>SALDO</h1>
                            {totalRegister >= 0 ? 
                                <h2>{moneyMask(totalRegister)}</h2> :
                                <h3>{moneyMask(totalRegister)}</h3>
                            }
                            
                        </StyledTotal>
                        
                    </div>

                }
            </Body>

            <Footer>
                <button onClick={() => navigate('/adicionar/entrada')}>
                    <div><AiOutlinePlusCircle/></div>
                    Nova<br/>entrada
                </button>
                <button onClick={() => navigate('/adicionar/saida')}>
                    <div><AiOutlineMinusCircle/></div>
                    Nova<br/>saída
                </button>
            </Footer>
            
        </Container>
    )
}