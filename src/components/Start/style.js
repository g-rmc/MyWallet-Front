import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FallingLines } from "react-loader-spinner";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h1 {
        cursor: pointer;
        color: white;
        font-family: 'Saira Stencil One', sans-serif;
        font-size: 32px;
        margin-bottom: 25px;

        &:hover {
        filter: brightness(70%);
        }

        &:active {
        transform: translateY(2px);
        }
    }
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 30px;

    input {
        font-family: 'Raleway', sans-serif;
        height: 60px;
        font-size: 20px;
        font-weight: 400;
        padding-left: 15px;
        margin-bottom: 15px;
        border-radius: 5px;
        border: none;
    }

    button {
        cursor: pointer;
        background-color: #a328d6;
        color: white;
        height: 60px;
        font-size: 20px;
        font-weight: 700;
        border-radius: 5px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            filter: brightness(70%);
        }

        &:active {
            transform: translateY(2px);
        }
    }
`

const StyledLink = styled(Link)`
    color: white;
    font-size: 15px;
    font-weight: 700;
    margin-top: 35px;
    cursor: pointer;

    &:hover {
        filter: brightness(70%);
    }

    &:active {
        transform: translateY(2px);
    }
`

function Loading () {
    return (
        <FallingLines
            width="80"
            color="white"
        />
    )
}

export {
    Container,
    StyledForm,
    StyledLink,
    Loading,
}