import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import { AiOutlineLogout, AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai';
import { Container, Head, Body, Footer } from "./style";

export default function History(){

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const name = 'Fulano' //user.name.split(' ')[0];

    return(
        <Container>
            <Head>
                <h1>Olá, {name}</h1>
                <div><AiOutlineLogout/></div>
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