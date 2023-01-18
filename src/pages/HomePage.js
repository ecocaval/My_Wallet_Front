import { useState } from "react"
import { Wrapper } from "../styles/GenericWrapperStyle";
import leaveIcon from "./../images/leaveIcon.png"
import circleIcon from "./../images/circleIcon.png"
import plusIcon from "./../images/plusIcon.png"
import minusIcon from "./../images/minusIcon.png"
import { StyledMain } from "../styles/StyledMainStyle";
import { StyledH1 } from "../styles/StyledH1Style";
import { StyledHeader } from "../styles/StyledHeaderStyle";
import { MyTransactions, TransactionButton, TransactionButtons, TransactionIcon } from "../styles/TransactionsStyle";

export default function HomePage() {

    const [userName, setUserName] = useState("Fulano") // ! Temporary name in useState
    const [userTransactions, setUserTransactions] = useState([])

    return (
        <Wrapper>
            <StyledMain>
                <StyledHeader>
                    <StyledH1>
                        Olá, {userName}
                    </StyledH1>
                    <img src={leaveIcon} alt="Leave Icon" />
                </StyledHeader>
                <MyTransactions>
                    <p>{userTransactions.length ? "" : "Não há registros de entrada ou saída"}</p>
                </MyTransactions>
                <TransactionButtons>
                    <TransactionButton>
                        <TransactionIcon>
                            <img src={circleIcon} alt="Circle Icon" />
                            <img src={plusIcon} alt="Plus Icon" />
                        </TransactionIcon>
                        <p>Nova entrada</p>
                    </TransactionButton>
                    <TransactionButton>
                        <TransactionIcon>
                            <img src={circleIcon} alt="Circle Icon" />
                            <img src={minusIcon} alt="Minus Icon" />
                        </TransactionIcon>
                        <p>Nova saída</p>
                    </TransactionButton>
                </TransactionButtons>
            </StyledMain>
        </Wrapper>
    )
}