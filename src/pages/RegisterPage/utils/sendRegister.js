//* Libraries
import axios from "axios";

export default async function sendRegister(e, userPassword, userPasswordConf, setRequestWasSent, userName, userEmail) {
    
    e.preventDefault()

    function checkPasswords(userPassword, userPasswordConf) {
        if (userPassword !== userPasswordConf) {
            alert("The passwords must be the same!")
            setRequestWasSent(false)
            return true
        }
        return false
    }

    setRequestWasSent(true)

    const passwordsAreIncorret = checkPasswords(userPassword, userPasswordConf)

    if(passwordsAreIncorret) return

    try {
        const registerResponse = await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, {
            name: userName,
            email: userEmail,
            password: userPassword
        })
        setRequestWasSent(false)
        return {status: registerResponse.status}
    } catch (err) {
        if (err.response.status === 422) alert("Preencha todos os campos fornecidos!")
        setRequestWasSent(false)
        return {status: err.response.status}
    }
} 