export default function checkLocalStorageNeedInTransactionInUpdate(transactionBeingUpdated, setTransactionBeingUpdated) {
 
    let transactionInLocal

    if (!transactionBeingUpdated) {
        transactionInLocal = JSON.parse(localStorage.getItem('transactionUpdate'))
        setTransactionBeingUpdated(transactionInLocal)
        return transactionInLocal
    
    }
    return transactionBeingUpdated
}