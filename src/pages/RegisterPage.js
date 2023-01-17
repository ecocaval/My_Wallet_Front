import { useState } from "react";
import { StyledMain, Wrapper } from "../styles/LoginRegisterPageStyle";
import { StyledButton } from "../styles/StyledButtonStyle";
import { StyledInput } from "../styles/StyledInputStyle";
import { StyledLink } from "../styles/StyledLinkStyle";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

export default function RegisterPage() {

    const [userLogin, setUserLogin] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userPasswordConf, setUserPasswordConf] = useState("")
    

    function sendRegister(e) {
        e.preventDefault()

        console.log(userLogin);        
        console.log(userEmail);        
        console.log(userPassword);        
        console.log(userPasswordConf); 
        
        // * put axios request here
    }

    return (
        <Wrapper>
            <StyledMain>
                <Logo />
                <form onSubmit={sendRegister}>
                    <StyledInput
                        placeholder="Nome"
                        type="text"
                        value={userLogin}
                        onChange={(e) => setUserLogin(e.currentTarget.value)}
                    />
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
                    <StyledInput
                        placeholder="Confirme a senha"
                        type="password"
                        value={userPasswordConf}
                        onChange={(e) => setUserPasswordConf(e.currentTarget.value)}
                    />
                    <StyledButton>
                        <p>Cadastrar</p>
                    </StyledButton>
                </form>
                <StyledLink>
                    <Link to="/">
                        Já tem uma conta? Entre agora!
                    </Link>
                </StyledLink>
            </StyledMain>
        </Wrapper>
    )
}