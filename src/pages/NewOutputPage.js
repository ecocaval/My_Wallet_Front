import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import { UpperWrapper } from "../styles/UpperWrapperStyle";
import { StyledButton } from "../styles/StyledButtonStyle";
import { StyledH1 } from "../styles/StyledH1Style";
import { StyledHeader } from "../styles/StyledHeaderStyle";
import { StyledInput } from "../styles/StyledInputStyle";
import { StyledMain } from "../styles/StyledMainStyle";

export default function NewOutputPage({ userInfo }) {

    const navigate = useNavigate()

    const [newValue, setNewValue] = useState("")
    const [newDescription, setNewDescription] = useState("")

    async function addNewOutput(e) {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${userInfo.userId}/transactions`, {
                value: Number(newValue),
                description: newDescription,
                type: "output",
                date: dayjs(Date.now()).format("DD/MM/YYYY")
            }, {
                headers: {
                    'authorization': 'Bearer ' + userInfo.token
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
                        Nova saída
                    </StyledH1>
                </StyledHeader>
                <form onSubmit={addNewOutput}>
                    <StyledInput
                        placeholder="Valor"
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.currentTarget.value)}
                    />
                    <StyledInput
                        placeholder="Descrição"
                        type="text"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.currentTarget.value)}
                    />
                    <StyledButton>
                        <p>Salvar saída</p>
                    </StyledButton>
                </form>
            </StyledMain>
        </UpperWrapper>
    )
}