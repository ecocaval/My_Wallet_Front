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

export default function NewEntryPage({ userInfo }) {

    const navigate = useNavigate()

    const [newValue, setNewValue] = useState("")
    const [newDescription, setNewDescription] = useState("")

    async function addNewEntry(e) {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${userInfo.userId}/transactions`, {
                value: Number(newValue),
                description: newDescription,
                type: "entry",
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
                        Nova entrada
                    </StyledH1>
                </StyledHeader>
                <form onSubmit={addNewEntry}>
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
                    <StyledButton type="submit">
                        <p>Salvar entrada</p>
                    </StyledButton>
                </form>
            </StyledMain>
        </UpperWrapper>
    )
}