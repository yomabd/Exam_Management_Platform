import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FaRightFromBracket } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';


const UserDropdown = () => {
    const navigate =  useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/");
    }

  return (    
         
   
    <div>
        <div className='bg-white fixed top-16 right-8 border-gray-300 text-[grey] flex space-y-2 shadow rounded max-md:w-[150px] md:w-[200px]'>
            <div className='flex pt-4 flex-col'>
            <Link className='flex items-center hover:text-purple-500 space-x-4 mb-4 p-3'>
            <FaUser />
            <h1 className='text-sm cursor-pointer'>View Profile</h1>
                
            </Link>
            <Link className='flex items-center hover:text-purple-500 space-x-4 mb-4 border-b p-3'>
            <FaLock />
            <h1 className='text-sm  cursor-pointer'>Change Password</h1>
                
            </Link>
            <div onClick={handleLogout} 
            >
                <Link className='flex items-center space-x-4 mb-4 border-b p-3 text-[red]'>
            <FaRightFromBracket />
            <h1 className=' cursor-pointer'>Logout</h1>
                
                </Link>
            </div>
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default UserDropdown