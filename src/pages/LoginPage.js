import Logo from "../components/Logo";
import { StyledMain, Wrapper } from "../styles/LoginPageStyle";
import { StyledButton } from "../styles/StyledButtonStyle";
import { StyledInput } from "../styles/StyledInputStyle";
import { StyledLink } from "../styles/StyledLinkStyle";

export default function LoginPage() {
    return (
        <Wrapper>
            <StyledMain>
                <Logo />
                <form>
                    <StyledInput placeholder="E-mail" />
                    <StyledInput placeholder="Senha" />
                    <StyledButton>
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