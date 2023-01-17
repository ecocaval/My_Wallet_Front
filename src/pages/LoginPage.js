import { useState } from "react";
import { StyledMain, Wrapper } from "../styles/LoginPageStyle";
import { StyledButton } from "../styles/StyledButtonStyle";
import { StyledInput } from "../styles/StyledInputStyle";
import { StyledLink } from "../styles/StyledLinkStyle";
import Logo from "../components/Logo";

export default function LoginPage() {

    const [userLogin, setUserLogin] = useState("")
    const [userPassword, setUserPassword] = useState("")

    function sendLogin(e) {
        e.preventDefault()

        console.log(userLogin);
        console.log(userPassword);

        // * put axios request here
    }

    return (
        <Wrapper>
            <StyledMain>
                <Logo />
                <form onSubmit={sendLogin}>
                    <StyledInput
                        value={userLogin}
                        placeholder="E-mail"
                        type="email"
                        onChange={(e) => setUserLogin(e.currentTarget.value)}
                    />
                    <StyledInput
                        value={userPassword}
                        placeholder="Senha"
                        type="password"
                        onChange={(e) => setUserPassword(e.currentTarget.value)}
                    />

                    <StyledButton
                        type="submit"
                    >
                        <p>Entrar</p>
                    </StyledButton>

                    <StyledLink>
                        Primeira vez? Cadastra-se!
                    </StyledLink>
                </form>
            </StyledMain>
        </Wrapper>
    )
}