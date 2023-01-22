import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
import axios from "axios";
import dayjs from "dayjs";

import { OneSecondsFadeIn, TwoSecondsFadeIn, ThreeSecondsFadeIn } from "../animations/fadeInAnimations";

import { UpperWrapper } from "../styles/UpperWrapperStyle";
import { StyledButton } from "../styles/StyledButtonStyle";
import { StyledH1 } from "../styles/StyledH1Style";
import { StyledHeader } from "../styles/StyledHeaderStyle";
import { StyledInput } from "../styles/StyledInputStyle";
import { StyledMain } from "../styles/StyledMainStyle";
import { InfinitySpin } from "react-loader-spinner";

export default function NewOutputPage({ userInfo, setUserInfo }) {

    const navigate = useNavigate()

    const [requestWasSent, setRequestWasSent] = useState(false)
    const [newValue, setNewValue] = useState("")
    const [newDescription, setNewDescription] = useState("")

    function treatValue(value) {
        return Number(value.replace(",", "."))
    }

    async function addNewOutput(e) {
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
                type: "output",
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
            setRequestWasSent(false)
        }
    }

    return (
        <UpperWrapper>
            <StyledMain>
                <StyledHeader>
                    <StyledH1>
                        <OneSecondsFadeIn>
                            Nova saída
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
                <form onSubmit={addNewOutput}>
                    <TwoSecondsFadeIn>
                        <StyledInput
                            placeholder="Valor"
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.currentTarget.value)}
                        />
                    </TwoSecondsFadeIn>
                    <ThreeSecondsFadeIn>
                        <StyledInput
                            placeholder="Descrição"
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.currentTarget.value)}
                        />
                    </ThreeSecondsFadeIn>
                    <StyledButton>
                        {requestWasSent ?
                            <InfinitySpin
                                width='200'
                                color="#FFFFFF"
                            /> : <p>Salvar saída</p>}
                    </StyledButton>
                </form>
            </StyledMain>
        </UpperWrapper>
    )
}