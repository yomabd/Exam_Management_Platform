// Header.jsx
import React from 'react';
import { useState } from 'react';
import { FaUserPlus } from "react-icons/fa";
<FaUserPlus />
import { FaUserMinus } from "react-icons/fa";
import UserDropdown from './UserDropdown';
<FaUserMinus />


const Header = ({ title }) => {

  const [userOn, setUserOn]  = useState(false);
  const handleUserclick = ()=> setUserOn(prev=> !prev);
  return (
    <header className= "fixed left-0 right-0 z-[2] bg-gray-800 text-white py-4 md:px-40 lg:px-60 shadow-md ">
      <div className='flex space-x-4'>

       <h1 className="text-5xl font-logo ml-2 z-50 absolute left-0">Exemp</h1>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className='cursor-pointer self-end absolute right-10'>
        {
          !userOn ?          
          <FaUserPlus size={30} className='text-white' onClick={handleUserclick} />
          :
          <>
          <FaUserMinus size={30} className='text-white' onClick={handleUserclick} />
          <UserDropdown/>
          </>
        }

      </div>

      </div>
    </header>
  );
};

export default Header;
