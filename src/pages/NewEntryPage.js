//* Libraries
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import dayjs from "dayjs";

//* Styles
import { UpperWrapper } from "../styles/UpperWrapperStyle";
import { StyledButton } from "../styles/StyledButtonStyle";
import { StyledH1 } from "../styles/StyledH1Style";
import { StyledHeader } from "../styles/StyledHeaderStyle";
import { StyledInput } from "../styles/StyledInputStyle";
import { StyledMain } from "../styles/StyledMainStyle";

//* Animations
import { OneSecondsFadeIn, TwoSecondsFadeIn } from "../animations/fadeInAnimations";

//* Contexts
import { UserContext } from "../Contexts/UserContext";

export default function NewEntryPage() {

    const navigate = useNavigate()

    const { userInfo, setUserInfo } = useContext(UserContext)

    const [requestWasSent, setRequestWasSent] = useState(false)
    const [newValue, setNewValue] = useState("")
    const [newDescription, setNewDescription] = useState("")

    function treatValue(value) {
        return Number(value.replace(",", "."))
    }

    async function addNewEntry(e) {
        e.preventDefault()

        setRequestWasSent(true)

        let userInfoUpdated = { ...userInfo }

        if (!userInfo.userId || !userInfo.token) {
            userInfoUpdated = JSON.parse(localStorage.getItem('userInfo'))
            setUserInfo(userInfoUpdated)
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${userInfoUpdated.userId}/transactions`, {
                value: treatValue(newValue),
                description: newDescription,
                type: "entry",
                date: dayjs(Date.now()).format("DD/MM/YYYY")
            }, {
                headers: {
                    'authorization': 'Bearer ' + userInfoUpdated.token
                }
            })

            setRequestWasSent(false)
            if (response.status === 201) navigate("/home")

        } catch (err) {
            console.error(err)
            if(err.response.status === 422) alert("Preencha todos os campos fornecidos!")
            setRequestWasSent(false)
        }
    }

    return (
        <UpperWrapper>
            <StyledMain>
                <StyledHeader>
                    <StyledH1>
                        <OneSecondsFadeIn>
                            Nova entrada
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
                <form onSubmit={addNewEntry}>
                    <TwoSecondsFadeIn>
                        <StyledInput
                            placeholder="Valor"
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.currentTarget.value)}
                        />
                    </TwoSecondsFadeIn>
                    <TwoSecondsFadeIn>
                        <StyledInput
                            placeholder="Descrição"
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.currentTarget.value)}
                        />
                    </TwoSecondsFadeIn>
                    <StyledButton type="submit">
                        {requestWasSent ?
                            <InfinitySpin
                                width='200'
                                color="#FFFFFF"
                            /> : <p>Salvar entrada</p>}
                    </StyledButton>
                </form>
            </StyledMain>
        </UpperWrapper>
    )
}