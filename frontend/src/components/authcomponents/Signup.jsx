import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserLock } from "react-icons/fa6";

export default function Signup() {
    return (
     
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           
            <FaUserLock className="mx-auto h-10 w-auto text-purple-600" />

            <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to create your account
            </h2>
          </div>
  
          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-2"  method="POST">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    id="firstname"
                    name="firstname"
                    type="firstname"
                    autoComplete="firstname"
                    autoFocus
                    required
                    className="block w-full rounded-md border-0 py-4 max-sm:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    id="lastname"
                    name="lastname"
                    type="lastname"
                    autoComplete="lastname"
                    
                    required
                    className="block w-full rounded-md border-0 py-4 max-sm:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    
                    required
                    className="block w-full rounded-md border-0 py-4 max-sm:py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
              </div>
  
              <div>
                {/* <div className="flex items-center justify-between"> */}
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <Link to={"#"}>
                    <a  className="font-semibold text-purple-600 hover:text-purple-500">
                      Forgot password?
                    </a>
                    </Link>
                  </div> */}
                {/* </div> */}
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
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
                  Sign up
                </button>
              </div>
            </form>
  
                <Link to={'/'}>
            <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account? 
              <a  className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
              Sign in
              </a>
            </p>
                </Link>
          </div>
        </div>
    )
  }
  








