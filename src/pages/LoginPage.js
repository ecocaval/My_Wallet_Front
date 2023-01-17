import { useState } from "react";
import { StyledMain, Wrapper } from "../styles/LoginRegisterPageStyle";
import { StyledButton } from "../styles/StyledButtonStyle";
import { StyledInput } from "../styles/StyledInputStyle";
import { StyledLink } from "../styles/StyledLinkStyle";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

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
                        placeholder="E-mail"
                        type="email"
                        value={userLogin}
                        onChange={(e) => setUserLogin(e.currentTarget.value)}
                    />
                    <StyledInput
                        placeholder="Senha"
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.currentTarget.value)}
                    />

                    <StyledButton
                        type="submit"
                    >
                        <p>Entrar</p>
                    </StyledButton>

                    <StyledLink>
                        <Link to="/cadastro">
                            Primeira vez? Cadastra-se!
                        </Link>
                    </StyledLink>
                </form>
            </StyledMain>
        </Wrapper>
    )
}