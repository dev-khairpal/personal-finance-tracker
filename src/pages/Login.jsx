import { useState } from "react";
import { Link } from "react-router"; // Corrected path for React Router DOM
import { useLogin } from "../hooks/useLogin";

const InputField = ({ label, type, value, onChange, placeholder }) => (
  <label className="flex flex-col">
    <span>{label}:</span>
    <input
      className="p-2 border rounded"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </label>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button
          type="submit"
          className="bg-green-600 p-4 rounded-md text-white disabled:bg-gray-400"
          disabled={isLoading}
        >
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <p>
          Don't have an account?{" "}
          <span className="text-blue-500">
            <Link to="/sign-up">Sign Up</Link>
          </span>
        </p>
      </form>
    </main>
  );
};

export default Login;
