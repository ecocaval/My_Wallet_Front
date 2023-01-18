import { useState } from "react";
import { UpperWrapper } from "../styles/UpperWrapperStyle";
import { StyledButton } from "../styles/StyledButtonStyle";
import { StyledH1 } from "../styles/StyledH1Style";
import { StyledHeader } from "../styles/StyledHeaderStyle";
import { StyledInput } from "../styles/StyledInputStyle";
import { StyledMain } from "../styles/StyledMainStyle";

export default function NewOutputPage() {

    const [newValue, setNewValue] = useState("")
    const [newDescription, setNewDescription] = useState("")

    function addNewOutput(e) {
        e.preventDefault()

        // console.log(newValue)
        // console.log(newDescription)

        // * put axios request here
    }

    return(
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