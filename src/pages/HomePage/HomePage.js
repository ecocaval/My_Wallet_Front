//* Libraries
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"
import axios from "axios";

//* Images
import leaveIcon from "./../../images/leaveIcon.png"
import circleIcon from "./../../images/circleIcon.png"
import plusIcon from "./../../images/plusIcon.png"
import minusIcon from "./../../images/minusIcon.png"

//* Components
import Loader from "../../components/Loader.js";

//* Styles
import { CenteredWrapper } from "../../styles/CenteredWrapperStyle";
import { StyledMain } from "../../styles/StyledMainStyle.js";
import { StyledH1 } from "../../styles/StyledH1Style.js";
import { StyledHeader } from "../../styles/StyledHeaderStyle.js";
import {
    TransactionsSection, TransactionButton, TransactionButtons, TransactionIcon,
    MyTransactions, BalanceSection, BalanceText, BalanceValue, NoRegistryText
} from "../../styles/TransactionsStyle.js";

//* Animations
import { OneSecondsFadeIn, OneSecondsFadeInLeft } from "../../animations/fadeInAnimations";

//* Contexts
import { UserContext } from "../../contexts/UserContext";
import { TransactionContext } from "../../contexts/TransactionContext";

//* Utils
import calculateBalanceValue from "./utils/calculateBalanceValue";
import Transaction from "./components/Transaction";

export default function HomePage() {

    const navigate = useNavigate()

    const { userInfo, setUserInfo, userTransactions, setUserTransactions } = useContext(UserContext)
    const { setTransactionBeingUpdated, setTransactionTypeBeingCreated } = useContext(TransactionContext)

    const [isTransactionNew, setIsTransactionNew] = useState([])
    const [userInfoWasReceveid, setUserInfoWasReceveid] = useState(false)
    const [balanceIsPositive, setBalanceIsPositive] = useState(true)
    const [activeIndexes, setActiveIndexes] = useState([-1]);

    async function getUserInfo() {
        try {
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

        } catch (err) {
            console.error(err)
            alert('Houve um erro ao receber as informações do usuário!')
            navigate("/")
        }
    }

    async function getUserTransactions(userInfoUpdated, index = activeIndexes.length + 1) {

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
            const deleted = await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userInfo.userId}/transactions/${transaction._id}`, {
                headers: {
                    'authorization': 'Bearer ' + userInfo.token
                }
            })

            if(deleted) getUserTransactions(userInfo, index)
        } catch (err) {
            console.error(err);
            alert("Houve um erro ao tentar deletar sua transação!")
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

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
                {userInfoWasReceveid ?
                    (
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
                                                    (isTransactionNew[index] === undefined) ? // if transaction was just created sets the animation
                                                        (<OneSecondsFadeInLeft key={uuidv4()}>
                                                            <Transaction transaction={transaction} setTransactionBeingUpdated={setTransactionBeingUpdated} activeIndexes={activeIndexes} setActiveIndexes={setActiveIndexes} index={index} deleteTransaction={deleteTransaction} navigate={navigate} />

                                                        </OneSecondsFadeInLeft>) : // if transaction is not new no animation occurs
                                                        <Transaction key={uuidv4()} transaction={transaction} setTransactionBeingUpdated={setTransactionBeingUpdated} activeIndexes={activeIndexes} setActiveIndexes={setActiveIndexes} index={index} deleteTransaction={deleteTransaction} navigate={navigate} />
                                                )
                                            }
                                            ).reverse()}
                                        </MyTransactions>
                                        <BalanceSection>
                                            <BalanceText>SALDO</BalanceText>
                                            <BalanceValue balanceIsPositive={balanceIsPositive}>
                                                {calculateBalanceValue(userTransactions, balanceIsPositive, setBalanceIsPositive)}
                                            </BalanceValue>
                                        </BalanceSection>
                                    </>
                                ) :
                                    <OneSecondsFadeIn><NoRegistryText>Não há registros de entrada ou saída</NoRegistryText></OneSecondsFadeIn>
                                }
                            </TransactionsSection>
                            <TransactionButtons>
                                <TransactionButton onClick={() => {
                                    setTransactionTypeBeingCreated("entry")
                                    localStorage.setItem("transactionType", "entry")
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
                                    localStorage.setItem("transactionType", "output")
                                    navigate("/nova-saida")
                                }}>
                                    <TransactionIcon>
                                        <img src={circleIcon} alt="Circle Icon" />
                                        <img src={minusIcon} alt="Minus Icon" />
                                    </TransactionIcon>
                                    <p>Nova saída</p>
                                </TransactionButton>
                            </TransactionButtons>
                        </>
                    ) : <Loader />}
            </StyledMain>
        </CenteredWrapper>
    )
}
