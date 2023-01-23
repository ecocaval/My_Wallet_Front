//* Libraries
import { FcEmptyTrash as Trash } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";

//* Components
import DeletingLoader from "../../../components/DeletingLoader";

//* Styles
import { IconContainer, TransactionDate, TransactionDescription, TransactionLeftInfo, TransactionRightInfo, TransactionStyle, TransactionValue } from "../../../styles/TransactionsStyle";

export default function Transaction({transaction, setTransactionBeingUpdated, activeIndexes, setActiveIndexes, index = -1, deleteTransaction, navigate}) {

    return (
        <>
            <TransactionStyle>

                <TransactionLeftInfo>
                    <TransactionDate>{transaction.date.slice(0, 5)}</TransactionDate>
                    <TransactionDescription>{transaction.description}</TransactionDescription>
                    <IconContainer onClick={() => {
                        setTransactionBeingUpdated(transaction)
                        localStorage.setItem("transactionUpdate", JSON.stringify(transaction))
                        localStorage.setItem("transactionType", transaction.type)
                        if (transaction.type === "entry") navigate(`/editar-entrada/${transaction._id}`)
                        else navigate(`/editar-saida/${transaction._id}`)
                    }}>
                        <FiEdit color="9254BE" />
                    </IconContainer>
                </TransactionLeftInfo>

                <TransactionRightInfo>
                    <TransactionValue transactionType={transaction.type}>
                        {transaction.type === "output" && "-"}{transaction.value.toFixed(2).replace(".", ",")}
                    </TransactionValue>
                    {!activeIndexes?.includes(index) ?
                        <IconContainer onClick={() => {
                            setActiveIndexes([...activeIndexes, index])
                            deleteTransaction(transaction, index)
                        }}>
                            <Trash color="#7E0A8F" />
                        </IconContainer> : <IconContainer><DeletingLoader /></IconContainer>}
                </TransactionRightInfo>

            </TransactionStyle>
        </>
    )
}