//* Libraries
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"

//* Styles
import GlobalStyle from "./styles/GlobalStyle.js"
import LoginPage from "./pages/LoginPage/LoginPage.js"
import RegisterPage from "./pages/RegisterPage/RegisterPage.js"

//* Pages
import HomePage from "./pages/HomePage/HomePage.js"
import EditTransactionPage from "./pages/EditTransaction/EditTransactionPage.js"
import NewTransactionPage from "./pages/NewTransaction/NewTransactionPage.js"

//* Contexts
import { UserContext } from "./contexts/UserContext.js"
import { TransactionContext } from "./contexts/TransactionContext.js"

export default function App() {

    const [userInfo, setUserInfo] = useState({})
    const [userTransactions, setUserTransactions] = useState([])
    const [transactionBeingUpdated, setTransactionBeingUpdated] = useState(null)
    const [transactionTypeBeingCreated, setTransactionTypeBeingCreated] = useState(null)

    return (
        <>
            <BackGround>
                <GlobalStyle />
                <UserContext.Provider value={{ userInfo, setUserInfo, userTransactions, setUserTransactions, }}>
                    <TransactionContext.Provider value={{
                        transactionBeingUpdated, setTransactionBeingUpdated,
                        transactionTypeBeingCreated, setTransactionTypeBeingCreated
                    }}>
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
                                    element={<NewTransactionPage />}
                                />
                                <Route
                                    path="/nova-saida"
                                    element={<NewTransactionPage />}
                                />
                                <Route
                                    path="/editar-entrada/:id"
                                    element={<EditTransactionPage />}
                                />
                                <Route
                                    path="/editar-saida/:id"
                                    element={<EditTransactionPage />}
                                />
                            </Routes>
                        </BrowserRouter>
                    </TransactionContext.Provider>
                </UserContext.Provider>
            </BackGround>
        </>
    )
}

const BackGround = styled.div`
    background-color: #9254BE;
    overflow: hidden;

`