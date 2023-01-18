import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../components/Logo.js";

import { CenteredWrapper } from "../styles/CenteredWrapperStyle.js";
import { StyledMain } from "../styles/StyledMainStyle.js";
import { StyledButton } from "../styles/StyledButtonStyle.js";
import { StyledInput } from "../styles/StyledInputStyle.js";
import { StyledLink } from "../styles/StyledLinkStyle.js";

export default function LoginPage() {

    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState("")
    const [userPassword, setUserPassword] = useState("")

    function sendLogin(e) {
        e.preventDefault()

        // console.log(userLogin);
        // console.log(userPassword);

        // * put axios request here

        navigate("/home") //! Temporaty - must have validation
    }

    return (
        <CenteredWrapper>
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
        </CenteredWrapper>
    )
}