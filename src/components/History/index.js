import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

import UserContext from "../../contexts/UserContext";

import { AiOutlineLogout, AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai';
import { Container, Head, Body, StyledRegister, StyledText, StyledList, StyledTotal, Footer } from "./style";
import { getRegister } from '../../services/mywallet';

export default function History(){

    const { user, setUser, config } = useContext(UserContext);
    const [ registerHistory, setRegisterHistory ] = useState([]);
    const [ totalRegister, setTotalRegister ] = useState(0);
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
        async function getHistory(){
            try {
                const register = await getRegister(config);
                setRegisterHistory(register.data);
                calculateTotal(register.data);
            } catch (error) {
                console.log(error)
            }
        }
        getHistory();
    },[])

    if (user.name) {
        userName = user.name.split(' ')[0];
    } else {
        userName = "@"
    }

    function confirmLogout () {
        if (window.confirm('Você realmente deseja fazer logout')){
            localStorage.removeItem('MyWalletUser');
            setUser('');
            navigate('/');
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
        return (
            <StyledRegister>
                <StyledText type={'date'}>{dayjs(register.date).format('DD/MM')}</StyledText>
                <StyledText type={'name'}>{register.name}</StyledText>
                <StyledText type={register.type}>{register.value}</StyledText>
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
                                <h2>{totalRegister}</h2> :
                                <h3>{Math.abs(totalRegister)}</h3>
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