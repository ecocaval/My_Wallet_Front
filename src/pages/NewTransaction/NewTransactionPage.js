//* Libraries
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { InfinitySpin } from "react-loader-spinner";

//* Styles
import { UpperWrapper } from "../../styles/UpperWrapperStyle";
import { StyledButton } from "../../styles/StyledButtonStyle";
import { StyledH1 } from "../../styles/StyledH1Style";
import { StyledHeader } from "../../styles/StyledHeaderStyle";
import { StyledInput } from "../../styles/StyledInputStyle";
import { StyledMain } from "../../styles/StyledMainStyle";

//* Animations
import { OneSecondsFadeIn, TwoSecondsFadeIn } from "../../animations/fadeInAnimations";

//* Contexts
import { UserContext } from "../../contexts/UserContext";
import { TransactionContext } from "../../contexts/TransactionContext";

//* Utils
import addNewTransaction from "./utils/addNewTransactions";
import checkLocalStorageNeedInTransactionInCreation from "../utils/checkLocalStorageNeedInTransactionInCreation";

export default function NewTransactionPage() {

    const navigate = useNavigate()

    const { userInfo, setUserInfo } = useContext(UserContext)
    const { transactionTypeBeingCreated, setTransactionTypeBeingCreated } = useContext(TransactionContext)

    const [requestWasSent, setRequestWasSent] = useState(false)
    const [newValue, setNewValue] = useState("")
    const [newDescription, setNewDescription] = useState("")

    useEffect(() => {
        if(!transactionTypeBeingCreated) checkLocalStorageNeedInTransactionInCreation(transactionTypeBeingCreated, setTransactionTypeBeingCreated)        
    }, [transactionTypeBeingCreated])

    return (
        <UpperWrapper>
            <StyledMain>
                <StyledHeader>
                    <StyledH1>
                        <OneSecondsFadeIn>
                            Nova {transactionTypeBeingCreated === "entry" ? "entrada" : "saida"}
                        </OneSecondsFadeIn>
                    </StyledH1>
                    <OneSecondsFadeIn>
                        <ImHome
                            color="#FFFFFF"
                            size="25px"
                            onClick={() => navigate("/home")}
                        />
                    </OneSecondsFadeIn>
                </StyledHeader>
                <form onSubmit={async (e) => {
                    const response = await addNewTransaction(e, setRequestWasSent, userInfo, setUserInfo, newValue, newDescription, transactionTypeBeingCreated, setTransactionTypeBeingCreated)
                    if (response.status === 201) navigate("/home")
                }}>
                    <TwoSecondsFadeIn>
                        <StyledInput
                            placeholder="Valor"
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.currentTarget.value)}
                            disabled={requestWasSent}
                        />
                    </TwoSecondsFadeIn>
                    <TwoSecondsFadeIn>
                        <StyledInput
                            placeholder="Descrição"
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.currentTarget.value)}
                            disabled={requestWasSent}
                        />
                    </TwoSecondsFadeIn>
                    <StyledButton type="submit" disabled={requestWasSent}>
                        {requestWasSent ?
                            <InfinitySpin
                                width='200'
                                color="#FFFFFF"
                            /> : <p>Salvar {transactionTypeBeingCreated === "entry" ? "entrada" : "saida"}</p>}
                    </StyledButton>
                </form>
            </StyledMain>
        </UpperWrapper>
    )
}