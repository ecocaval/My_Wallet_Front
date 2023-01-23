//* Libraries
import axios from "axios";
import dayjs from "dayjs";

//* Utils
import treatValue from "../../utils/treatValue";
import checkLocalStorageNeedInUser from "../../utils/checkLocalStorageNeedInUser";
import checkLocalStorageNeedInTransactionInUpdate from "../../utils/checkLocalStorageNeedInTransactionInUpdate";

export default async function updateEntry(userInfo, setUserInfo, setRequestWasSent, transactionBeingUpdated, setTransactionBeingUpdated, newValue, newDescription) {

    setRequestWasSent(true)

    let userInfoUpdated = checkLocalStorageNeedInUser({ ...userInfo }, setUserInfo)
    let transactionToUpdate = checkLocalStorageNeedInTransactionInUpdate(transactionBeingUpdated, setTransactionBeingUpdated)

    try {
        const updateDescription = {
            date: dayjs(Date.now()).format("DD/MM/YYYY"),
            hour: dayjs(Date.now()).format("HH:mm:ss"),
            fromValue: transactionToUpdate.value,
            toValue: treatValue(newValue),
            fromDesc: transactionToUpdate.description,
            toDesc: newDescription,
        }

        const putResponse = await axios.put(`${process.env.REACT_APP_API_URL}/users/${userInfoUpdated.userId}/transactions/${transactionToUpdate._id}`, {
            value: treatValue(newValue),
            description: newDescription,
            updatedDate: transactionToUpdate.updatedDate?.length > 0 ?
                [...transactionToUpdate.updatedDate, updateDescription] :
                [updateDescription] // makes an array of updated information
        }, {
            headers: {
                'authorization': 'Bearer ' + userInfoUpdated.token
            }
        })
        return putResponse.status

    } catch (err) {
        console.error(err)
        return err.response.status
    }
}