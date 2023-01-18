import { useState } from "react"
import { useNavigate } from "react-router-dom";

import leaveIcon from "./../images/leaveIcon.png"
import circleIcon from "./../images/circleIcon.png"
import plusIcon from "./../images/plusIcon.png"
import minusIcon from "./../images/minusIcon.png"

import { CenteredWrapper } from "../styles/CenteredWrapperStyle";
import { StyledMain } from "../styles/StyledMainStyle.js";
import { StyledH1 } from "../styles/StyledH1Style.js";
import { StyledHeader } from "../styles/StyledHeaderStyle.js";
import { TransactionsSection, TransactionButton, TransactionButtons, TransactionIcon, Transaction, TransactionDate, TransactionDescription, TransactionValue, MyTransactions, TransactionLeftInfo, BalanceSection, BalanceText, BalanceValue } from "../styles/TransactionsStyle.js";
import styled from "styled-components";

export default function HomePage() {

    const navigate = useNavigate()
    const [userName, setUserName] = useState("Fulano") // ! Temporary name in useState
    const [userTransactions, setUserTransactions] = useState([])

    function calculateBalanceValue() {
        
        let balance = 0

        userTransactions.forEach(transaction => {
            balance += Number(transaction.value)
        })
        
        return String(balance)
    }

    return (
        <CenteredWrapper>
            <StyledMain>
                <StyledHeader>
                    <StyledH1>
                        Olá, {userName}
                    </StyledH1>
                    <img src={leaveIcon} alt="Leave Icon" onClick={() => navigate("/")} />
                </StyledHeader>
                <TransactionsSection thereAreTransactions={userTransactions.length}>
                    {userTransactions.length ? (
                        <>
                            <MyTransactions>
                                {userTransactions.map(transaction => (
                                    <Transaction>
                                        <TransactionLeftInfo>
                                            <TransactionDate>{transaction.date}</TransactionDate>
                                            <TransactionDescription>{transaction.description}</TransactionDescription>
                                        </TransactionLeftInfo>
                                        <div>
                                            <TransactionValue transactionType={transaction.type}>{transaction.value}</TransactionValue>
                                        </div>
                                    </Transaction>
                                ))}
                            </MyTransactions>
                            <BalanceSection>
                                <BalanceText>SALDO</BalanceText>
                                <BalanceValue>{calculateBalanceValue()}</BalanceValue>
                            </BalanceSection>
                        </>
                    ) : <p>Não há registros de entrada ou saída</p>}
                </TransactionsSection>
                <TransactionButtons>
                    <TransactionButton onClick={() => navigate("/nova-entrada")}>
                        <TransactionIcon>
                            <img src={circleIcon} alt="Circle Icon" />
                            <img src={plusIcon} alt="Plus Icon" />
                        </TransactionIcon>
                        <p>Nova entrada</p>
                    </TransactionButton>
                    <TransactionButton onClick={() => navigate("/nova-saida")}>
                        <TransactionIcon>
                            <img src={circleIcon} alt="Circle Icon" />
                            <img src={minusIcon} alt="Minus Icon" />
                        </TransactionIcon>
                        <p>Nova saída</p>
                    </TransactionButton>
                </TransactionButtons>
            </StyledMain>
        </CenteredWrapper>
    )
}

