import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 30px;
`
const Head = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    font-size: 26px;
    font-weight: 700;

    div {
        border-radius: 50%;
        cursor: pointer;

        &:hover {
            filter: brightness(70%);
        }

        &:active {
            transform: translateY(2px);
        }
    }
`

const Body = styled.div`
    width: 100%;
    min-height: 150px;
    height: calc(100vh - 230px);
    background-color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 20px;
    color: #868686;
`

const Footer = styled.div`
    width: 100%;
    height: 150px;
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        cursor: pointer;
        width: 48%;
        height: 100%;
        background-color: #A328D6;
        border-radius: 5px;
        padding: 10px;
        border: none;
        color: white;
        font-weight: 700;
        font-size: 20px;
        text-align: start;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        div {
            font-size: 30px;
        }

        &:hover {
            filter: brightness(70%);
        }

        &:active {
            transform: translateY(2px);
        }
    }
`

export {
    Container,
    Head,
    Body,
    Footer,
}