//* Libraries
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";


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
import sendRegister from "./utils/sendRegister.js";

export default function RegisterPage() {

    const navigate = useNavigate()

    const [requestWasSent, setRequestWasSent] = useState(false)
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userPasswordConf, setUserPasswordConf] = useState("")

    return (
        <CenteredWrapper>
            <StyledMain>
                <Logo />
                <form onSubmit={async (e) => {
                    const response = await sendRegister(e, userPassword, userPasswordConf, setRequestWasSent, userName, userEmail)
                    if(response.status === 201) navigate("/")
                }}>
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