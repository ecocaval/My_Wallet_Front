import styled from "styled-components";

export const MyTransactions = styled.main`
    width: 325px;
    height: 450px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    > p {
        text-align: center;
        width: 60%;
        font-family: 'Raleway';
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #868686;
    }
`

export const TransactionButtons = styled.section`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
`

export const TransactionButton = styled.button`
    width: 150px;
    height: 120px;
    background: #A328D6;
    border-radius: 5px;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;

    > p {
        text-align: left;
        width: 50%;
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 17px;
        color: #FFFFFF;
    }
`

export const TransactionIcon = styled.figure`
    position: relative;
    width: 25px;
    height: 25px;
    
    > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`