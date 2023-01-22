//* Libraries
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";

//* Components
import Logo from "../components/Logo.js";

//* Styles
import { CenteredWrapper } from "../styles/CenteredWrapperStyle.js";
import { StyledMain } from "../styles/StyledMainStyle.js";
import { StyledButton } from "../styles/StyledButtonStyle.js";
import { StyledInput } from "../styles/StyledInputStyle.js";
import { StyledLink } from "../styles/StyledLinkStyle.js";

//* Animations
import { OneSecondsFadeInRight, OneSecondsFadeInLeft, TwoSecondsFadeIn } from "../animations/fadeInAnimations.js";

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

        if (userPassword !== userPasswordConf) {
            alert("The passwords must be the same!")
            return setRequestWasSent(false)
        }

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
            if(err.response.status === 422) alert("Preencha todos os campos fornecidos!")
            setRequestWasSent(false)
        }
    }

    return (
        <CenteredWrapper>
            <StyledMain>
                <Logo />
                <form onSubmit={sendRegister}>
                    <TwoSecondsFadeIn>
                        <OneSecondsFadeInLeft>
                            <StyledInput
                                placeholder="Nome"
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.currentTarget.value)}
                                autoComplete="name"
                            />
                        </OneSecondsFadeInLeft>
                        <OneSecondsFadeInRight>
                            <StyledInput
                                placeholder="E-mail"
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.currentTarget.value)}
                                autoComplete="email"
                            />
                        </OneSecondsFadeInRight>
                        <OneSecondsFadeInLeft>
                            <StyledInput
                                placeholder="Senha"
                                type="password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.currentTarget.value)}
                                autoComplete="new-password"
                            />

                        </OneSecondsFadeInLeft>
                        <OneSecondsFadeInRight>
                            <StyledInput
                                placeholder="Confirme a senha"
                                type="password"
                                value={userPasswordConf}
                                onChange={(e) => setUserPasswordConf(e.currentTarget.value)}
                                autoComplete="new-password"
                            />
                        </OneSecondsFadeInRight>
                    </TwoSecondsFadeIn>
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
        </CenteredWrapper >
    )
}