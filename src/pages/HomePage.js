//* Libraries
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"
import { FcEmptyTrash as Trash } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import axios from "axios";

//* Images
import leaveIcon from "./../images/leaveIcon.png"
import circleIcon from "./../images/circleIcon.png"
import plusIcon from "./../images/plusIcon.png"
import minusIcon from "./../images/minusIcon.png"

//* Components
import Loader from "../components/Loader.js";
import DeletingLoader from "../components/DeletingLoader";

//* Styles
import { CenteredWrapper } from "../styles/CenteredWrapperStyle";
import { StyledMain } from "../styles/StyledMainStyle.js";
import { StyledH1 } from "../styles/StyledH1Style.js";
import { StyledHeader } from "../styles/StyledHeaderStyle.js";
import {
    TransactionsSection, TransactionButton, TransactionButtons, TransactionIcon,
    Transaction, TransactionDate, TransactionDescription, TransactionValue,
    MyTransactions, TransactionLeftInfo, BalanceSection, BalanceText, BalanceValue, TransactionRightInfo, TrashContainer, NoRegistryText
} from "../styles/TransactionsStyle.js";

//* Animations
import { OneSecondsFadeIn, OneSecondsFadeInLeft } from "../animations/fadeInAnimations";

//* Contexts
import { UserContext } from "../contexts/UserContext";
import { TransactionContext } from "../contexts/TransactionContext";

export default function HomePage() {

    const navigate = useNavigate()

    const { userInfo, setUserInfo, userTransactions, setUserTransactions } = useContext(UserContext)
    const { setTransactionBeingUpdated, setTransactionTypeBeingCreated } = useContext(TransactionContext)

    const [isTransactionNew, setIsTransactionNew] = useState([])
    const [userInfoWasReceveid, setUserInfoWasReceveid] = useState(false)
    const [balanceIsPositive, setBalanceIsPositive] = useState(true)
    const [activeIndexes, setActiveIndexes] = useState([-1]);

    async function getUserInfo() {

        if (!userInfo.token || !userInfo.userId) {
            const userInfoInLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
            setUserInfo(userInfoInLocalStorage)

            getUserTransactions(userInfoInLocalStorage)
            return
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userInfo.userId}`, {
            headers: {
                'authorization': 'Bearer ' + userInfo.token
            }
        })

        const updatedUserInfo = { ...userInfo, ...response.data }

        setUserInfo(updatedUserInfo)

        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo))

        getUserTransactions(updatedUserInfo)
    }

    async function getUserTransactions(userInfoUpdated, index = -1) {

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userInfoUpdated.userId}/transactions`, {
                headers: {
                    'authorization': 'Bearer ' + userInfoUpdated.token
                }
            })
            setActiveIndexes([...activeIndexes].splice(index, 1))
            setUserTransactions(response.data)
            setUserInfoWasReceveid(true)
        } catch (error) {
            setActiveIndexes([...activeIndexes].splice(index, 1))
            setUserInfoWasReceveid(true)
        }
    }

    async function deleteTransaction(transaction, index) {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userInfo.userId}/transactions/${transaction._id}`, {
                headers: {
                    'authorization': 'Bearer ' + userInfo.token
                }
            })
            getUserTransactions(userInfo, index)
        } catch (err) {
            console.error(err);
            alert("Houve um erro ao tentar deletar sua transação!")
        }
    }

    function calculateBalanceValue() {
        let balance = 0

        userTransactions.forEach(transaction => {
            if (transaction.type === 'entry') balance += Number(transaction.value)
            else balance -= Number(transaction.value)
        })

        if (balance > 0 && !balanceIsPositive) setBalanceIsPositive(true)
        else if (balance < 0 && balanceIsPositive) setBalanceIsPositive(false)

        return String(balance.toFixed(2))
    }

    useEffect(() => getUserInfo, [])

    useEffect(function treatAnimation() {
        userTransactions.forEach((_, index) => {
            if (isTransactionNew[index] === undefined) {
                isTransactionNew[index] = true
            }
        })
    }, [userTransactions])

    return (
        <CenteredWrapper>
            <StyledMain>
                {userInfoWasReceveid ? (
                    <>
                        <StyledHeader>
                            <StyledH1>
                                Olá, {userInfo.name}
                            </StyledH1>
                            <img src={leaveIcon} alt="Leave Icon" onClick={() => navigate("/")} />
                        </StyledHeader>
                        <TransactionsSection thereAreTransactions={userTransactions.length}>
                            {userTransactions.length ? (
                                <>
                                    <MyTransactions>
                                        {userTransactions.map((transaction, index) => {
                                            return (
                                                (isTransactionNew[index] === undefined) ?
                                                    (<OneSecondsFadeInLeft key={uuidv4()}>
                                                        <Transaction>

                                                            <TransactionLeftInfo>
                                                                <TransactionDate>{transaction.date.slice(0, 5)}</TransactionDate>
                                                                <TransactionDescription>{transaction.description}</TransactionDescription>
                                                                <TrashContainer onClick={() => {
                                                                    setTransactionBeingUpdated(transaction)
                                                                    if (transaction.type === "entry") navigate(`/editar-entrada/${transaction._id}`)
                                                                    else navigate(`/editar-saida/${transaction._id}`)
                                                                }}>
                                                                    <FiEdit color="9254BE" />
                                                                </TrashContainer>
                                                            </TransactionLeftInfo>

                                                            <TransactionRightInfo>
                                                                <TransactionValue transactionType={transaction.type}>
                                                                    {transaction.type === "output" && "-"}{transaction.value.toFixed(2).replace(".", ",")}
                                                                </TransactionValue>
                                                                {!activeIndexes?.includes(index) ?
                                                                    <TrashContainer onClick={() => {
                                                                        setActiveIndexes([...activeIndexes, index])
                                                                        deleteTransaction(transaction, index)
                                                                    }}>
                                                                        <Trash color="#7E0A8F" />
                                                                    </TrashContainer> : <TrashContainer><DeletingLoader /></TrashContainer>}
                                                            </TransactionRightInfo>

                                                        </Transaction>
                                                    </OneSecondsFadeInLeft>) :
                                                    <Transaction key={uuidv4()}>
                                                        <TransactionLeftInfo>
                                                            <TransactionDate>{transaction.date.slice(0, 5)}</TransactionDate>
                                                            <TransactionDescription>{transaction.description}</TransactionDescription>

                                                            <TrashContainer onClick={() => {
                                                                setTransactionBeingUpdated(transaction)
                                                                if (transaction.type === "entry") navigate(`/editar-entrada/${transaction._id}`)
                                                                else navigate(`/editar-saida/${transaction._id}`)
                                                            }}>
                                                                <FiEdit color="9254BE" />
                                                            </TrashContainer>
                                                        </TransactionLeftInfo>

                                                        <TransactionRightInfo>
                                                            <TransactionValue transactionType={transaction.type}>
                                                                {transaction.type === "output" && "-"}{transaction.value.toFixed(2)}
                                                            </TransactionValue>
                                                            {!activeIndexes?.includes(index) ?
                                                                <TrashContainer onClick={() => {
                                                                    setActiveIndexes([...activeIndexes, index])
                                                                    deleteTransaction(transaction, index)
                                                                }}>
                                                                    <Trash color="#7E0A8F" />
                                                                </TrashContainer> : <TrashContainer><DeletingLoader /></TrashContainer>}
                                                        </TransactionRightInfo>

                                                    </Transaction>
                                            )
                                        }
                                        ).reverse()}
                                    </MyTransactions>
                                    <BalanceSection>
                                        <BalanceText>SALDO</BalanceText>
                                        <BalanceValue balanceIsPositive={balanceIsPositive}>{calculateBalanceValue()}</BalanceValue>
                                    </BalanceSection>
                                </>
                            ) :
                                <OneSecondsFadeIn><NoRegistryText>Não há registros de entrada ou saída</NoRegistryText></OneSecondsFadeIn>
                            }
                        </TransactionsSection>
                        <TransactionButtons>
                            <TransactionButton onClick={() => {
                                setTransactionTypeBeingCreated("entry")
                                navigate("/nova-entrada")
                            }}>
                                <TransactionIcon>
                                    <img src={circleIcon} alt="Circle Icon" />
                                    <img src={plusIcon} alt="Plus Icon" />
                                </TransactionIcon>
                                <p>Nova entrada</p>
                            </TransactionButton>
                            <TransactionButton onClick={() => {
                                setTransactionTypeBeingCreated("output")
                                navigate("/nova-saida")
                            }}>
                                <TransactionIcon>
                                    <img src={circleIcon} alt="Circle Icon" />
                                    <img src={minusIcon} alt="Minus Icon" />
                                </TransactionIcon>
                                <p>Nova saída</p>
                            </TransactionButton>
                        </TransactionButtons>
                    </>) : <Loader />}
            </StyledMain>
        </CenteredWrapper>
    )
}
