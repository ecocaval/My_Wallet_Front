import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import { OneSecondsFadeIn, ThreeSecondsFadeIn, TwoSecondsFadeIn } from "../animations/fadeInAnimations";

import { UpperWrapper } from "../styles/UpperWrapperStyle";
import { StyledButton } from "../styles/StyledButtonStyle";
import { StyledH1 } from "../styles/StyledH1Style";
import { StyledHeader } from "../styles/StyledHeaderStyle";
import { StyledInput } from "../styles/StyledInputStyle";
import { StyledMain } from "../styles/StyledMainStyle";

export default function NewOutputPage({ userInfo, setUserInfo }) {

    const navigate = useNavigate()

    const [newValue, setNewValue] = useState("")
    const [newDescription, setNewDescription] = useState("")

    function treatValue(value) {
        return Number(value.replace(",","."))
    }

    async function addNewOutput(e) {
        e.preventDefault()

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

            if (response.status === 201) navigate("/home")

        } catch (err) {
            console.error(err)
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
                        <p>Salvar saída</p>
                    </StyledButton>
                </form>
            </StyledMain>
        </UpperWrapper>
    )
}