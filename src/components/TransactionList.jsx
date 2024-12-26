import { useFirestore } from "../hooks/useFirestore";

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFirestore("transactions");

  return (
    <ul className="flex flex-col gap-6">
      {transactions.map((transaction) => (
        <li
          key={transaction.id}
          className="bg-green-100 shadow-lg rounded-lg p-6 border border-green-300 flex justify-between items-center hover:shadow-xl transition-all"
        >
          <div className="flex flex-col">
            <div className="text-xl font-semibold text-gray-800">
              {transaction.name}
            </div>
            <span className="text-lg text-green-700 font-medium">
              Amount: Rs. {transaction.amount}
            </span>
          </div>

          <button
            className="bg-gray-500 text-white rounded-full px-2  hover:bg-red-500 transition-all"
            onClick={() => deleteDocument(transaction.id)} // Correctly calling delete function
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
