import axios from "axios";
import { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import AccountCard from "../components/AccountCard";

function Dashboard() {
  const [accounts, setAccounts] = useState(null);
  const [accountTypes, setAccountTypes] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAccounts() {
      const response = await axios.get("/accounts");
      const dataObject = response.data;

      const keysArray = Object.keys(dataObject);
      const dataArray = Object.keys(dataObject).map((key) => dataObject[key]);

      const formattedArray = [];
      keysArray.forEach((key, index) => {
        const formmatedData = { ...dataArray[index] };
        formmatedData["documentId"] = key;
        formattedArray.push(formmatedData);
      });
      setAccounts(formattedArray);

      setLoading(false);
    }
    fetchAccounts();

    async function fetchAccountsType() {
      const response = await axios.get("/accounttypes");
      const dataObject = response.data;

      const keysArray = Object.keys(dataObject);
      const dataArray = Object.keys(dataObject).map((key) => dataObject[key]);

      const formattedArray = [];
      keysArray.forEach((key, index) => {
        const formmatedData = { ...dataArray[index] };
        formmatedData["documentId"] = key;
        formattedArray.push(formmatedData);
      });
      setAccountTypes(formattedArray);
    }
    fetchAccountsType();
  }, []);

  const getRandomAccount = () => {
    let getAccountType = [...accountTypes?.map((account) => account.title)];
    getAccountType =
      getAccountType[Math.floor(Math.random() * getAccountType.length)];

    return getAccountType;
  };

  return (
    <div className="dashboard">
      <h1>My Accounts</h1>
      <div className="accounts-container">
        <div className="account-header">
          <h2>Name</h2>
          <h2>Profit & Loss</h2>
          <h2>Account Type</h2>
        </div>
        {loading && (
          <div className="spinner">
            <DotLoader color="#2EEBD3" loading={loading} size={150} />
          </div>
        )}

        <div className="account-display">
          {accounts &&
            accountTypes &&
            accounts.map((account, _index) => (
              <AccountCard
                key={account.id}
                id={_index}
                account={account}
                typeOfAccount={getRandomAccount()}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
