import { useState } from "react";
import { supabase } from "../config/supabase";
import { Header } from "../components/Header";

export default function ClientLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("Processing...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful!");

    }
  };

  return (
    <>
      <header className='px-4 py-2 fixed top-0 bg-black right-0 left-0 h-[50px] flex justify-between items-center'>
        <h1 className='text-2xl font-bold'><span className='text-green-300'>Open</span>menu</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-headset" viewBox="0 0 16 16">
          <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
        </svg>
      </header>
      <div className=" fixed inset-0 flex flex-col justify-center p-5 max-w-[400px] m-auto">
        <form onSubmit={handleSignup} className="space-y-4 max-w-sm mx-auto">
          <h2 className="text-xl font-bold font-[StackSansText] mb-6">Hey Admin👋</h2>

          <input
            type="email"
            placeholder="Email"
            className="border-2 px-4 py-2 w-full border-green-300 outline-0 focus:border-white rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border-2 px-4 py-2 w-full border-green-300 outline-0 focus:border-white rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-green-300 font-[StackSansText] text-black text-lg font-bold w-full p-2 rounded-lg"
          >
            Login
          </button>
        </form>
        {/* <div className="flex justify-between mt-3">
          <p className="text-sm text-blue-400 font-bold">Sign Up</p>
          <p className="text-green-300 text-sm">Forget Password?</p>
        </div> */}
      </div>
      {message && <p className="text-sm fixed bottom-4 left-0 right-0 text-center">{message}</p>}
    </>
  );
}
