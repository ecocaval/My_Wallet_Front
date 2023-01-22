import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";

import Logo from "../components/Logo.js";

import { CenteredWrapper } from "../styles/CenteredWrapperStyle.js";
import { StyledMain } from "../styles/StyledMainStyle.js";
import { StyledButton } from "../styles/StyledButtonStyle.js";
import { StyledInput } from "../styles/StyledInputStyle.js";
import { StyledLink } from "../styles/StyledLinkStyle.js";
import { FiveSecondsFadeIn, FourSecondsFadeIn, ThreeSecondsFadeIn, TwoSecondsFadeIn } from "../animations/fadeInAnimations.js";

export default function RegisterPage() {

    const navigate = useNavigate()

    const [requestWasSent, setRequestWasSent] = useState(false)
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userPasswordConf, setUserPasswordConf] = useState("")

    async function sendRegister(e) {
        e.preventDefault()
        setRequestWasSent(true)

        if (userPassword !== userPasswordConf) return alert("The passwords must be the same!")

        try {
            const registerResponse = await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, {
                name: userName,
                email: userEmail,
                password: userPassword
            })
            setRequestWasSent(false)
            if (registerResponse.status !== 201) return
            navigate("/")
        } catch (err) {
            setRequestWasSent(false)
        }

    }

    return (
        <CenteredWrapper>
            <StyledMain>
                <Logo />
                <form onSubmit={sendRegister}>
                    <TwoSecondsFadeIn>
                        <StyledInput
                            placeholder="Nome"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.currentTarget.value)}
                            autoComplete="name"
                        />
                    </TwoSecondsFadeIn>
                    <ThreeSecondsFadeIn>
                        <StyledInput
                            placeholder="E-mail"
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.currentTarget.value)}
                            autoComplete="email"
                        />
                    </ThreeSecondsFadeIn>
                    <FourSecondsFadeIn>
                        <StyledInput
                            placeholder="Senha"
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.currentTarget.value)}
                            autoComplete="new-password"
                        />

                    </FourSecondsFadeIn>
                    <FiveSecondsFadeIn>
                        <StyledInput
                            placeholder="Confirme a senha"
                            type="password"
                            value={userPasswordConf}
                            onChange={(e) => setUserPasswordConf(e.currentTarget.value)}
                            autoComplete="new-password"
                        />
                    </FiveSecondsFadeIn>
                    <StyledButton>
                        {requestWasSent ?
                            <InfinitySpin
                                width='200'
                                color="#FFFFFF"
                            /> : <p>Cadastrar</p>}
                    </StyledButton>
                </form>
                <StyledLink>
                    <Link to="/">
                        Já tem uma conta? Entre agora!
                    </Link>
                </StyledLink>
            </StyledMain>
        </CenteredWrapper>
    )
}