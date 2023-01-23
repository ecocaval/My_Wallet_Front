//* Libraries
import axios from "axios";
import dayjs from "dayjs";
import checkLocalStorageNeedInTransactionInCreation from "../../utils/checkLocalStorageNeedInTransactionInCreation";
import checkLocalStorageNeedInUser from "../../utils/checkLocalStorageNeedInUser";

//* Utils
import treatValue from "../../utils/treatValue"

export default async function addNewTransaction(e, setRequestWasSent, userInfo, setUserInfo, newValue, newDescription, transactionTypeBeingCreated, setTransactionTypeBeingCreated) {
    e.preventDefault()

    setRequestWasSent(true)

    let userInfoUpdated = checkLocalStorageNeedInUser({ ...userInfo }, setUserInfo)
    let transactionType = checkLocalStorageNeedInTransactionInCreation(transactionTypeBeingCreated, setTransactionTypeBeingCreated)

    const transaction = {
        value: treatValue(newValue),
        description: newDescription,
        type: transactionType,
        date: dayjs(Date.now()).format("DD/MM/YYYY")
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${userInfoUpdated.userId}/transactions`, transaction, {
            headers: {
                'authorization': 'Bearer ' + userInfoUpdated.token
            }
        })

        setRequestWasSent(false)
        return { status: response.status }

    } catch (err) {
        console.error(err)
        if (err.response.status === 422) alert("Preencha todos os campos fornecidos!")
        setRequestWasSent(false)
        return { status: err.response.status }
    }
}