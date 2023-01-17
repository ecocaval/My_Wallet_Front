import GlobalStyle from "./styles/GlobalStyle.js"
import styled from "styled-components"
import Logo from "./components/Logo"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage.js"
import RegisterPage from "./pages/RegisterPage.js"

export default function App() {
    return(
        <>
            <BackGround>
                <GlobalStyle/>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<LoginPage/>}
                        />
                        <Route
                            path="/cadastro"
                            element={<RegisterPage/>}
                        />
                    </Routes>
                </BrowserRouter>
            </BackGround>
        </>
    )
}

const BackGround = styled.div`
    background-color: #9254BE;
    height: 100vh;
`