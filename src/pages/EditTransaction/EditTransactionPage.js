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
import updateEntry from "./utils/updateEntry";
import checkLocalStorageNeedInTransactionInUpdate from "../utils/checkLocalStorageNeedInTransactionInUpdate";

export default function EditTransactionPage() {

    const navigate = useNavigate()

    const { transactionBeingUpdated, setTransactionBeingUpdated } = useContext(TransactionContext)
    const { userInfo, setUserInfo } = useContext(UserContext)

    const [requestWasSent, setRequestWasSent] = useState(false)
    const [newValue, setNewValue] = useState("")
    const [newDescription, setNewDescription] = useState("")

    async function treatEntry(e) {
        e.preventDefault()
        
        const status = await updateEntry(userInfo, setUserInfo, setRequestWasSent, transactionBeingUpdated, setTransactionBeingUpdated, newValue, newDescription)

        if (status === 200 || status === 204) {
            setRequestWasSent(false)
            setTransactionBeingUpdated(null)
            return navigate("/home")
        } else {
            setRequestWasSent(false)
            alert("Preencha todos os campos fornecidos!")
            return 
        }
    }

    useEffect(() => {
        if(!transactionBeingUpdated) checkLocalStorageNeedInTransactionInUpdate(transactionBeingUpdated, setTransactionBeingUpdated)        
    }, [transactionBeingUpdated])


    return (
        <UpperWrapper>
            <StyledMain>
                <StyledHeader>
                    <StyledH1>
                        <OneSecondsFadeIn>
                            Editar {transactionBeingUpdated?.type === "entry" ? "entrada" : "saida"}
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
                <form onSubmit={(e) => treatEntry(e)}>
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
                            /> : <p>Atualizar {transactionBeingUpdated?.type === "entry" ? "entrada" : "saida"}</p>}
                    </StyledButton>
                </form>
            </StyledMain>
        </UpperWrapper>
    )
}