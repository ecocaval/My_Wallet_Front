import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"

import GlobalStyle from "./styles/GlobalStyle.js"

import LoginPage from "./pages/LoginPage.js"
import RegisterPage from "./pages/RegisterPage.js"
import HomePage from "./pages/HomePage.js"
import NewEntryPage from "./pages/NewEntryPage.js"
import NewOutputPage from "./pages/NewOutputPage.js"

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
                        <Route
                            path="/home"
                            element={<HomePage/>}
                        />
                        <Route
                            path="/nova-entrada"
                            element={<NewEntryPage/>}
                        />
                        <Route
                            path="/nova-saida"
                            element={<NewOutputPage/>}
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