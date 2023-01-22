import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"

import { useState } from "react"

import GlobalStyle from "./styles/GlobalStyle.js"

import LoginPage from "./pages/LoginPage.js"
import RegisterPage from "./pages/RegisterPage.js"
import HomePage from "./pages/HomePage.js"
import NewEntryPage from "./pages/NewEntryPage.js"
import NewOutputPage from "./pages/NewOutputPage.js"


export default function App() {

    const [userInfo, setUserInfo] = useState({})
    const [userTransactions, setUserTransactions] = useState([])

    return (
        <>
            <BackGround>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<LoginPage setUserInfo={setUserInfo} setUserTransactions={setUserTransactions} />}
                        />
                        <Route
                            path="/cadastro"
                            element={<RegisterPage />}
                        />
                        <Route
                            path="/home"
                            element={<HomePage
                                userInfo={userInfo}
                                setUserInfo={setUserInfo}
                                userTransactions={userTransactions}
                                setUserTransactions={setUserTransactions} />}
                        />
                        <Route
                            path="/nova-entrada"
                            element={<NewEntryPage
                                userInfo={userInfo}
                                setUserInfo={setUserInfo}
                            />}
                        />
                        <Route
                            path="/nova-saida"
                            element={<NewOutputPage 
                                userInfo={userInfo}
                                setUserInfo={setUserInfo}
                            />}
                        />
                    </Routes>
                </BrowserRouter>
            </BackGround>
        </>
    )
}

const BackGround = styled.div`
    background-color: #9254BE;
    overflow: hidden;

`