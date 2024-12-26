import { Link } from "react-router";
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
const {user} = useAuthContext()
  const {logout } = useLogout();

  return (
    <nav className="bg-gray-900 text-white p-8">
      <ul className="flex items-center gap-8 sm:justify-between lg:justify-between mx-2 lg:mx-36  sm:mx-12">
        <li>
          <Link to="/"><img src="logo.png" alt="logo" className="w-32 sm:w-44 rounded-md" /></Link>
        </li>
        {!user && (<div className="flex items-center gap-6">
          <li className="hover:border-b-2 box">
            <Link to="/login">Login</Link>
          </li>

          <li className="bg-green-600 px-2 py-1 rounded-md">
            <Link to="/sign-up">Sign Up</Link>
          </li>

          
        </div>)}
        
        {user && (
          <>
          <li>Hello, {user.displayName}</li>
          <li className="p-2 bg-red-600 rounded-md"> <button onClick={logout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
