function AccountCard({account, typeOfAccount}) {
  return (
    <div className="account-card">
         <h3>{account.name}</h3>
         <h3 className="account-profit">{account.currency + ' '}{account.profitLoss}</h3>
         <h3>{typeOfAccount}</h3>
    </div>
  )
}

export default AccountCard