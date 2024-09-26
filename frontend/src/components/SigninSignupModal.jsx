import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';


const SigninSignupModal = ({signin, setSignin, setSignup}) => {
  return (
         <div className="fixed inset-0 rounded-md rounded-br-md -z-40 flex justify-center items-center"
         onClick={()=>{signin? setSignin(false) : setSignup(false)}}
         >
            <div className='p-6 space-y-4 bg-white min-w-96 relative min-h-48 rounded-md shadow-lg'
            onClick={(e)=>e.stopPropagation()}
            >
              <div><IoClose className='font-extrabold text-2xl cursor-pointer hover:scale-110  hover:bg-gray-300 hover:rounded-md'
              onClick={()=>{signin? setSignin(false) : setSignup(false)}}
              /></div>
              {signin ? <p className=" italic text-md text-center font-extrabold">SIGN IN</p> : <p className=" italic text-md text-center font-extrabold">SIGN UP</p> }
              <div className="flex items-center justify-around">

              <Link to={signin ? "/candidate" : "/register/candidate"}>
                <div className="flex flex-col justify-around items-center rounded-lg p-3 bg-purple-700 hover:bg-purple-500 max-md:text-sm max-md:p-2 text-white font-light">
                  <FaUser />
                  User
                </div>
              </Link>
              <Link to={signin ? "/admin" : "/register/admin"}>
                <div className="flex flex-col justify-center items-center rounded-lg p-3 bg-purple-700 hover:bg-purple-500 max-md:text-sm max-md:p-2 text-white font-light">
                  <FaHouseUser />
                  Admin
                </div>
              </Link>
              </div>
            </div>
            </div>
         
  )
}

export default SigninSignupModal