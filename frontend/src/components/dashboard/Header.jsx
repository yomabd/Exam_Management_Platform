import React from 'react';
import { useState } from 'react';
import { FaUserPlus } from "react-icons/fa";
<FaUserPlus />
import { FaUserMinus } from "react-icons/fa";
import UserDropdown from './UserDropdown';
import { FaBars } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";




const Header = ({ title, handleBarclick, barOn }) => {

  const [userOn, setUserOn]  = useState(false);
  const handleUserclick = ()=> setUserOn(prev=> !prev);
  

  return (
    <header className= "fixed left-0 right-0 top-0 z-[2] bg-gray-800 text-white py-4 pl-40 md:pl-48 max-md:py-8 lg:pl-60 shadow-m h-[100px]">
      <div className='flex space-x-4'>
      <button className="md:hidden absolute left-4 top-[50px] translate-y-[-50%]">{
        barOn?
        <IoClose size={30}
        onClick={handleBarclick} 
        />
       :
        <FaBars size={30}
        onClick={handleBarclick} 
        />
      }

      </button>
       <h1 className="font-logo text-4xl max-md:text-3xl  max-md:ml-4 z-50 absolute left-0 max-md:left-12 top-[50px] translate-y-[-50%] text-sky-400">Exemp</h1>
      <h1 className="lg:text-2xl md:text-xl max-md:hidden font-semibold  md:absolute md:left-[236px] md:top-[60px]">{title}</h1>
      <div className='cursor-pointer self-end absolute right-10 top-[50px] translate-y-[-50%]'>
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
