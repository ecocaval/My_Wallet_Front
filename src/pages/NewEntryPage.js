import { useState } from "react";
import { UpperWrapper } from "../styles/UpperWrapperStyle";
import { StyledButton } from "../styles/StyledButtonStyle";
import { StyledH1 } from "../styles/StyledH1Style";
import { StyledHeader } from "../styles/StyledHeaderStyle";
import { StyledInput } from "../styles/StyledInputStyle";
import { StyledMain } from "../styles/StyledMainStyle";

export default function NewEntryPage() {

    const [newValue, setNewValue] = useState("")
    const [newDescription, setNewDescription] = useState("")

    function addNewEntry(e) {
        e.preventDefault()

        console.log(newValue)
        console.log(newDescription)
    }

    return(
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
                    <StyledButton>
                        <p>Salvar entrada</p>
                    </StyledButton>
                </form>
            </StyledMain>
        </UpperWrapper>
    )
}