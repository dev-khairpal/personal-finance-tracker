import { useState } from "react"
import { Link } from "react-router"
import { useSignup } from "../hooks/useSignup";


const SignUp = () => {
    const inputStyle = "p-2 border"

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const {error, isLoading, signup} = useSignup();


    function handleSubmit(e){
        e.preventDefault()
        signup(email, password, fullName)
    }
    return (
      <main className="flex items-center justify-center h-screen">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <label className="flex flex-col">
          <span>Full Name : </span>
              <input className={`${inputStyle}`} type="text" placeholder="john@example.com"
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
               />
               </label>
          <label className="flex flex-col">
          <span>Email : </span>
              <input className={`${inputStyle}`} type="email" placeholder="john@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
               />
          </label>
          <label className="flex flex-col">
          <span>Password : </span>
              <input className={`${inputStyle}`} type="password" placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
               />
          </label>
          <button className="bg-green-600 p-4 rounded-md">Sign Up</button>
          
          <p>Already have an Account. <span className="text-blue-500"><Link to='/login'>Login ?</Link></span></p>
          </form>

      </main>
  )
}

export default SignUp