import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import { AiOutlineLogout, AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai';
import { Container, Head, Body, Footer } from "./style";

export default function History(){

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    let name;

    useEffect(() => {
        if (user === ''){
            navigate('/');
            if (localStorage.getItem('MyWalletUser') === null) {
                alert ('Por favor, faça o login novamente')
            }
        }
    })

    if (user.name) {
        name = user.name.split(' ')[0];
    } else {
        name = "@"
    }

    function confirmLogout () {
        if (window.confirm('Você realmente deseja fazer logout')){
            localStorage.removeItem('MyWalletUser');
            setUser('');
            navigate('/');
        }
    }

    return(
        <Container>
            <Head>
                <h1>Olá, {name}</h1>
                <div onClick={confirmLogout}><AiOutlineLogout/></div>
            </Head>

            <Body>
                Histórico
            </Body>

            <Footer>
                <button>
                    <div><AiOutlinePlusCircle/></div>
                    Nova<br/>entrada
                </button>
                <button>
                    <div><AiOutlineMinusCircle/></div>
                    Nova<br/>saída
                </button>
            </Footer>
            
        </Container>
    )
}