//* Libraries
import axios from "axios";

export default async function sendLogin(e, setUserInfo, setUserTransactions, setRequestWasSent, userEmail, userPassword) {
    e.preventDefault()

    setRequestWasSent(true)
    setUserInfo({})
    setUserTransactions([])

    try {
        const signInResponse = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, {
            email: userEmail,
            password: userPassword
        })

        const token = signInResponse.data.token.replace("Bearer ", "")
        const userId = signInResponse.data.userId

        if (signInResponse.status === 200) {
            setUserInfo({
                userId,
                token
            })
        }
        return { status: signInResponse.status }

    } catch (err) {
        if (err.name === "AxiosError") alert("Não encontramos uma conta com estes dados!")
        setRequestWasSent(false)
        return { status: err.response.status }
    }
}