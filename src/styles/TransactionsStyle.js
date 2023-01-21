import styled from "styled-components";

export const TransactionsSection = styled.section`
    width: 325px;
    height: 450px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.thereAreTransactions ? "space-between" : "center"};
    align-items: center;
    padding: 15px;

    > p {
        text-align: center;
        width: 70%;
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

export const MyTransactions = styled.section`
    width: 100%;
    height: 90%;
    overflow-y: scroll; //! Temporary - should put scroll indication after 

    ::-webkit-scrollbar-track {
        padding: 2px 0;
        background-color: #7c1474;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #cf99d4;
    }
`

export const Transaction = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0px;
`

export const TransactionLeftInfo = styled.div`
    display: flex;
`

export const TransactionDate = styled.p`
    font-family: 'Raleway';
    font-style: normal;
    font-size: 16px;
    color: #C6C6C6;
`

export const TransactionDescription = styled.p`
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    margin-left: 10px;
`

export const TransactionValue = styled.p`
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 16px;
    margin-right: 8px;
    color: ${props => props.transactionType === "entry" ? "#03AC00" : "#C70000"};
`

export const BalanceSection = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const BalanceText = styled.p`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 17px;
    color: #000000;
`

export const BalanceValue = styled.p`
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 17px;
    color: ${props => props.balanceIsPositive ? "#03AC00" : "#C70000" };
`