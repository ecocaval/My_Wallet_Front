export default function checkLocalStorageNeedInTransactionInCreation(transactionTypeBeingCreated, setTransactionTypeBeingCreated){
    
    let transactionType

    if (!transactionTypeBeingCreated) {
        transactionType = localStorage.getItem('transactionType')
        setTransactionTypeBeingCreated(transactionType)
        return transactionType
    
    }
    return transactionTypeBeingCreated
}