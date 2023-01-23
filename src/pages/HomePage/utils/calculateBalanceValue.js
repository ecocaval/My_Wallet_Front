export default function calculateBalanceValue(userTransactions, balanceIsPositive, setBalanceIsPositive) {
    let balance = 0

    userTransactions.forEach(transaction => {
        if (transaction.type === 'entry') balance += Number(transaction.value)
        else balance -= Number(transaction.value)
    })

    if (balance > 0 && !balanceIsPositive) setBalanceIsPositive(true)
    else if (balance < 0 && balanceIsPositive) setBalanceIsPositive(false)

    return String(balance.toFixed(2)).replace(".", ",")
}