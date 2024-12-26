import TransactionForm from "../components/TransactionForm";
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from "../hooks/useCollection";
import TransactionList from "../components/TransactionList";

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]  // Ordering by createdAt in descending order
  );

  return (
    <main className="flex flex-col md:flex-row gap-8 justify-between p-4">
      {/* Transaction List Section */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Transactions</h2>
        {error && <p className="text-red-500">{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>

      {/* Transaction Form Section */}
      <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add a Transaction</h2>
        <TransactionForm uid={user.uid} />
      </div>
    </main>
  );
};

export default Home;
