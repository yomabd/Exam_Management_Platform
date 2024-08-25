import React from 'react'
import { useState } from 'react';
import bgImage from '../assets/laptop_human.png'
import { Button } from './dashboard/FormComponents'
import { IoHome } from "react-icons/io5";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import {Link} from 'react-router-dom'
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";






const LandingPage = () => {
    const [signin, setSignin] =useState(false);
    const [signup, setSignup] =useState(false);
    console.log(signin,'sign in')
    console.log(signup,'signup')
  return (
    <div className='w-screen min-h-screen'>
   
    <div className='w-screen min-h-screen bg-[#e5d6d6] bg-gradient-to-br fro-purple-500 to-sk-800 relative pt-4 flex justify-center flex-col gap-24' style={{backgroundImage:`url(${bgImage})`,backgroundSize:'cover'}}>
        <div className="w-full fixed top-0 bg-[#f1ebeb] h-20 max-md:h-16 flex justify-between items-center gap-24 border-b pb-4 pt-4 mt-0">
            <div className='font-logo text-4xl max-md:text-3xl ml-12 max-md:ml-4 max-md:left-24 text-sky-400-logo'>
                <h1 className='ml-4' >Exemp</h1>
                </div>
            <div className='list-none flex justify-between items-center gap-6'>
                <li className='text-lg text-purple-900 max-md:text-base flex items-center gap-1'><IoHome size={15} />Home</li>
                <li className='bg-indigo-600 hover:bg-indigo-700 rounded-2xl p-4 pt-2 pb-2 text-white flex items-center max-md:text-sm cursor-pointer'
                onClick={()=>setSignin(prev => !prev)}
                >Sign in<IoIosArrowDown /></li>
                <li className='bg-indigo-600 hover:bg-indigo-700 rounded-2xl p-4 pt-2 pb-2 mr-4 text-white flex items-center max-md:text-sm cursor-pointer'
                onClick={()=>setSignup(prev => !prev)}
                > Sign up<IoIosArrowDown /></li>
            </div>         
            
            {
                (signin || signup) && (<div className='absolute top-20 right-0 w-60 max-md:top-16 bg-[#f0e4e4] h-48 flex items-center justify-around rounded-bl-md rounded-br-md'>
                    <Link to={signin ? '/candidate':'/register/candidate'}>
                <div className='flex flex-col justify-center items-center rounded-lg p-3 bg-indigo-700 hover:bg-indigo-500 max-md:text-sm'>
                <FaUser  />
                    User
                    </div>
                    </Link>
                    <Link to={signin ? '/admin':'/register/admin'}>
                <div className='flex flex-col justify-center items-center rounded-lg p-3 bg-indigo-700 hover:bg-indigo-500 max-md:text-sm'>
                <FaHouseUser  />
                    Admin
                    </div>
                    </Link>
            </div>)
            }
            

        </div>
        <div className='w-3/4 mx-auto mt-24' >
            <div className='w-full text-black'>

            <h1 className='font-bold text-5xl max-md:text-4xl'>
                Streamline your exam workflow with our Platform
            </h1>
            <h4 className='font-medium text-lg mt-3'>Seamlessly create and manage exam with an easy-to-navigate interface</h4>
            <button className='bg-indigo-600 text-white hover:bg-indigo-700 w-1/3 mt-6 rounded-3xl py-4 text-xl '>
                Try It Now
            </button>
            </div>           

</div>
        <div className='mx-auto w-2/3 space-y-4'>
            <h1 className='font-semibold text-3xl'>Why Choose Our Platform?</h1>
            <ul className='space-y-3'>
                <li className='flex gap-2 text-2xl items-center' ><MdPlaylistAddCheckCircle size={20} />Seamless exam creation</li>
                <li className='flex gap-2 text-2xl items-center'><MdPlaylistAddCheckCircle size={20} />Smooth-taking of exams</li>
                <li className='flex gap-2 text-2xl items-center'><MdPlaylistAddCheckCircle size={20} />User-friendly Dashboard</li>
                <li className='flex gap-2 text-2xl items-center'><MdPlaylistAddCheckCircle size={20} />Secure login access for both candidates and admins</li>
    
            </ul>
        </div>
        
    </div>
    <div className='mt-10 w-full pt-4 border-t pb-8 flex justify-start pl-8 gap-8'>
        <div className='flex gap-3'>
        <Link className='hover:text-gray-400'  to={'mailto:idreesyomi@gmail.com'}><MdOutlineMail size={25}/></Link>
        <Link className='hover:text-gray-400' to={'https://wa.me/2347063923692'}><FaWhatsapp  size={25}/></Link>

        </div>
       <p className='text-center font-light text-sm'>&copy; Developer <span><Link to={'Https://linkedin.com/in/ao-idris'}>Yomabd.</Link> </span>  All rights reserved</p>

    </div>
    </div>
  )
}

export default LandingPage