import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      amount: parseFloat(amount), // Ensure amount is a number
    });
  };


  useEffect(() => {
    if (response.success) {
        setName("");
        setAmount("");
      
      toast.success("Added Successfully");
    }
  }, [response.success]); // Depend on response.success

  const inputStyle = "flex flex-col p-2 w-full border rounded-md ";

  return (
    <div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <label>
          <span>Transaction Name:</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${inputStyle}`}
          />
        </label>
        <label>
          <span>Amount (Rs.):</span>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`${inputStyle}`}
          />
        </label>
        <button className="bg-green-600 rounded-md text-white p-2">Add</button>
      </form>
    </div>
  );
};

export default TransactionForm;
