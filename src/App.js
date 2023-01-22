//* Libraries
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"

//* Styles
import GlobalStyle from "./styles/GlobalStyle.js"
import LoginPage from "./pages/LoginPage.js"
import RegisterPage from "./pages/RegisterPage.js"
import HomePage from "./pages/HomePage.js"
import NewEntryPage from "./pages/NewEntryPage.js"
import NewOutputPage from "./pages/NewOutputPage.js"

//* Contexts
import { UserContext } from "./Contexts/UserContext.js"

export default function App() {

    const [userInfo, setUserInfo] = useState({})
    const [userTransactions, setUserTransactions] = useState([])

    return (
        <>
            <BackGround>
                <GlobalStyle />
                <UserContext.Provider value={{ userInfo, setUserInfo, userTransactions, setUserTransactions }}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={<LoginPage />}
                            />
                            <Route
                                path="/cadastro"
                                element={<RegisterPage />}
                            />
                            <Route
                                path="/home"
                                element={<HomePage />}
                            />
                            <Route
                                path="/nova-entrada"
                                element={<NewEntryPage />}
                            />
                            <Route
                                path="/nova-saida"
                                element={<NewOutputPage />}
                            />
                        </Routes>
                    </BrowserRouter>
                </UserContext.Provider>
            </BackGround>
        </>
    )
}

const BackGround = styled.div`
    background-color: #9254BE;
    overflow: hidden;

`