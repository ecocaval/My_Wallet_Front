import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { InfinitySpin } from 'react-loader-spinner'

import Logo from "../components/Logo.js";

import { CenteredWrapper } from "../styles/CenteredWrapperStyle.js";
import { StyledMain } from "../styles/StyledMainStyle.js";
import { StyledButton } from "../styles/StyledButtonStyle.js";
import { StyledInput } from "../styles/StyledInputStyle.js";
import { StyledLink } from "../styles/StyledLinkStyle.js";
import { ThreeSecondsFadeIn, TwoSecondsFadeIn } from "../animations/fadeInAnimations.js";

export default function LoginPage({ setUserInfo, setUserTransactions }) {

    const navigate = useNavigate()

    const [requestWasSent, setRequestWasSent] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    async function sendLogin(e) {
        e.preventDefault()

        setRequestWasSent(true)
        setUserInfo({})
        setUserTransactions([])

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
            }
            navigate("/home")

        } catch (error) {
            if (error.name === "AxiosError") alert("Não encontramos uma conta com estes dados!")
            setRequestWasSent(false)
        }
    }


    return (
        <CenteredWrapper>
            <StyledMain>
                <Logo />
                <form onSubmit={sendLogin}>
                    <TwoSecondsFadeIn>
                        <StyledInput
                            placeholder="E-mail"
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.currentTarget.value)}
                            autoComplete="email"
                        />
                    </TwoSecondsFadeIn>
                    <ThreeSecondsFadeIn>
                        <StyledInput
                            placeholder="Senha"
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.currentTarget.value)}
                            autoComplete="current-password"
                        />
                    </ThreeSecondsFadeIn>
                    <StyledButton
                        type="submit"
                    >
                        {requestWasSent ?
                            <InfinitySpin
                                width='200'
                                color="#FFFFFF"
                            /> : <p>Entrar</p>}
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

