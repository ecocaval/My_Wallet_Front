import GlobalStyle from "./styles/GlobalStyle.js"
import styled from "styled-components"
import Logo from "./components/Logo"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage.js"

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