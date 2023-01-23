//* Libraries
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InfinitySpin } from 'react-loader-spinner'

//* Components
import Logo from "../../components/Logo.js";

//* Styles
import { CenteredWrapper } from "../../styles/CenteredWrapperStyle.js";
import { StyledMain } from "../../styles/StyledMainStyle.js";
import { StyledButton } from "../../styles/StyledButtonStyle.js";
import { StyledInput } from "../../styles/StyledInputStyle.js";
import { StyledLink } from "../../styles/StyledLinkStyle.js";

//* Animations
import { OneSecondsFadeInRight, OneSecondsFadeInLeft, TwoSecondsFadeIn } from "../../animations/fadeInAnimations.js";

//* Contexts
import { UserContext } from "../../contexts/UserContext.js";

//* Utils
import sendLogin from "./utils/sendLogin.js";

export default function LoginPage() {

    const navigate = useNavigate()

    const { setUserInfo, setUserTransactions } = useContext(UserContext)

    const [requestWasSent, setRequestWasSent] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    localStorage.clear()

    return (
        <CenteredWrapper>
            <StyledMain>
                <Logo />
                <form onSubmit={async (e) => {
                    const response = await sendLogin(e, setUserInfo, setUserTransactions, setRequestWasSent, userEmail, userPassword)
                    if (response.status === 200) navigate("/home")
                }}>
                    <TwoSecondsFadeIn>
                        <OneSecondsFadeInLeft>
                            <StyledInput
                                placeholder="E-mail"
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.currentTarget.value)}
                                autoComplete="email"
                            />
                        </OneSecondsFadeInLeft>
                        <OneSecondsFadeInRight>
                            <StyledInput
                                placeholder="Senha"
                                type="password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.currentTarget.value)}
                                autoComplete="current-password"
                            />
                        </OneSecondsFadeInRight>
                    </TwoSecondsFadeIn>
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

