import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserLock } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";






export default function CandidateSignin() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please fill out all the fields");
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3005/api/candidate/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        toast.success("User signed in successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Ops!!! ${error.response.data.message}`);
      });

    
  };

    return (
     
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           
            <FaUserLock className="mx-auto h-10 w-auto text-purple-600" />

            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your <span className='italic text-3xl'>Candidate</span>  account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogin} method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                    required
                    className="block w-full rounded-md border-0 py-4 max-sm:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link 
                    to={"#"} 
                    className="font-semibold text-purple-600 hover:text-purple-500">
                      Forgot password?                    
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-4 max-sm:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"                  
                  className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not yet have an account?{' '}
                <Link to={'/signup'} href="#" className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
                signup here            
                </Link>
            </p>
          </div>
          <ToastContainer/>
        </div>
    )
  }
  








