import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../components/Logo.js";

import { CenteredWrapper } from "../styles/CenteredWrapperStyle.js";
import { StyledMain } from "../styles/StyledMainStyle.js";
import { StyledButton } from "../styles/StyledButtonStyle.js";
import { StyledInput } from "../styles/StyledInputStyle.js";
import { StyledLink } from "../styles/StyledLinkStyle.js";

export default function LoginPage({ setUserInfo }) {

    const navigate = useNavigate()

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    async function sendLogin(e) {
        e.preventDefault()

        try {
            const signInResponse = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, {
                email: userEmail,
                password: userPassword
            })

            const token = signInResponse.data.token.replace("Bearer ", "")
            const userId = signInResponse.data.userId

            if (signInResponse.status === 200) {

                setUserInfo({
                    userId,
                    token
                })
                navigate("/home")
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CenteredWrapper>
            <StyledMain>
                <Logo />
                <form onSubmit={sendLogin}>
                    <StyledInput
                        placeholder="E-mail"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.currentTarget.value)}
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