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
import { MyTransactions, TransactionButton, TransactionButtons, TransactionIcon } from "../styles/TransactionsStyle.js";

export default function HomePage() {

    const navigate = useNavigate()
    const [userName, setUserName] = useState("Fulano") // ! Temporary name in useState
    const [userTransactions, setUserTransactions] = useState([])

    return (
        <CenteredWrapper>
            <StyledMain>
                <StyledHeader>
                    <StyledH1>
                        Olá, {userName}
                    </StyledH1>
                    <img src={leaveIcon} alt="Leave Icon" onClick={() => navigate("/")}/>
                </StyledHeader>
                <MyTransactions>
                    <p>{userTransactions.length ? "" : "Não há registros de entrada ou saída"}</p>
                </MyTransactions>
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