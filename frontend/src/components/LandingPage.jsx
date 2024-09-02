import React from "react";
import { useState } from "react";
import bgImage from "../assets/laptop_human.png";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { SiPushbullet } from "react-icons/si";

const LandingPage = () => {
  const [signin, setSignin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [openBar, setOpenBar] = useState(false);
  return (
    <div className="w-screen min-h-screen">
      <div
        className="w-screen min-h-screen bg-[#e5d6d6] bg-gradient-to-br from-purple-500 to-sky-800 relative pt-4 flex justify-start flex-col gap-8 bg-blend-lighten"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
      >
        {
              openBar && <div className="absolute bg-purple-500 top-0 left-0 bottom-0 w-1/3 z-1 z-50 opacity-95">
                <div className="flex flex-col gap-10 items-center text-white">
                  <Link className="underline italic pl-4 pt-12 hover:translate-y-0.5 "
                  onClick={() => {!signin? setSignin((prev) => true) :''}}
                  >log in</Link>
                  <Link className="underline italic pl-4 hover:translate-y-0.5"
                  onClick={() => {!signin? setSignup((prev) => true) :''}}
                  >sign up</Link>
                </div>

              </div>
            }
        <div className="w-full fixed top-0 bg-[#f1ebeb] h-20 max-md:h-16 flex justify-between items-center gap-24 border-b pb-4 pt-4 mt-0">
          <div className="font-logo text-3xl max-md:text-2xl ml-12 max-md:ml-4 max-md:left-24 text-sky-400-logo">
            <h1 className="ml-4 text-purple-600">Exemp</h1>
          </div>
          <div className="list-none flex justify-between items-center gap-6">
            <li className="text-lg text-gray-700 max-md:text-base max-md:pr-6 flex items-center gap-1">
              <IoHome size={15} />
              Home
            </li>
            <li
              className="group bg-purple-600 hover:bg-purple-700 rounded-2xl p-4 pt-2 pb-2 text-white flex items-center max-md:text-sm max-md:hidden cursor-pointer"
              onClick={() => { !signup? setSignin((prev) => true):""}}
            >
              Sign in
              <IoIosArrowDown className='group-hover:rotate-180 duration-300 self-end animate-bounce' />
            </li>
            <li
              className="group bg-purple-600 hover:bg-purple-700 rounded-2xl p-4 pt-2 pb-2 mr-4 text-white flex items-center max-md:text-sm max-md:hidden cursor-pointer"
              onClick={() => {!signin? setSignup((prev) => true) :''}}
            >
              {" "}
              Sign up
              <IoIosArrowDown className='group-hover:rotate-180 duration-300 self-start animate-bounce' />
            </li>
            {!openBar ? (
              <li onClick={() => setOpenBar((prev) => !prev)} className="md:hidden font-extrabold text-xl mr-6 text-white rounded-md  bg-black p-1.5">
                <FaBars />
              </li>
            ) : (
              <li onClick={() => setOpenBar((prev) => !prev)} className="md:hidden font-extrabold text-xl mr-6 text-white rounded-md  bg-black p-1.5">
                <IoClose />
              </li>
            )}
            
          </div>

          {(signin || signup) && (
            <div className="absolute top-20 right-0 w-60 max-md:top-16 bg-[#f0e4e4] h-48 flex flex-col justify-around rounded-bl-md rounded-br-md">
              <div><IoClose className='absolute top-1 left-4 font-extrabold text-2xl text-red-600 cursor-pointer hover:scale-110 bg-red-200 rounded-sm'
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
          )}
        </div>
        <div className="w-3/4 max-md:w-full max-md:px-6 mx-auto mt-24">
          <div className="w-full text-black">
            <h1 className="text-5xl font-bold max-md:text-4xl font-top">
              Streamline your exam workflow with our Platform
            </h1>
            <h4 className="font-medium font-bottom text-xl max-md:text-lg mt-3">
              Seamlessly create and manage exam with an easy-to-navigate
              interface
            </h4>
            <button className="bg-purple-600 text-white hover:bg-purple-700 w-1/3 mt-6 rounded-3xl py-4 text-xl max-md:text-base"
            onClick={() => {!signin? setSignup((prev) => true) :''}}>
              Try It Now
            </button>
          </div>
        </div>
        <div className="mx-auto w-3/4 max-md:w-full max-md:px-6 space-y-4">
        <p className="text-3xl font-bold leading-10 max-md:text-xl font-middle ">Our platform is changing the game for creating, managing, and taking exams. Whether you're a teacher making exams a breeze or a student gearing up for success, we've got everything you need.</p>
      </div>
        <div className="mx-auto w-2/3 max-md:w-full max-md:px-6 space-y-4">
          <h1 className="font-semibold font-top text-3xl max-md:text-2xl">Why Choose Our Platform?</h1>
          <ul className="space-y-3 max-md:space-y-2 text-xl max-md:text-xl font-bottom font-semibold">
            <li className="flex gap-2 items-center bg-purple-200 p-2 rounded-md">
              <SiPushbullet  className='text-purple-700 icon-size ' />
              Seamless exam creation
            </li>
            <li className="flex gap-2 items-center bg-white p-2 rounded-md">
              <SiPushbullet size={20} className='text-purple-700 icon-size' />
              Smooth-taking of exams
            </li>
            <li className="flex gap-2 items-center bg-white p-2 rounded-md">
              <SiPushbullet size={20} className='text-purple-700 icon-size' />
              User-friendly Dashboard
            </li>
            <li className="flex gap-2 items-center bg-white p-2 rounded-md">
              <SiPushbullet size={20} className='text-purple-700 icon-size' />
              Secure login access for users
            </li>
          </ul>
        </div>
       
      </div>
      
      <div className="w-full pt-4 border-t pb-8 flex max-md:flex-col justify-start max-md:items-center pl-8 gap-8 max-md:gap-5">
        <div className="flex gap-3">
          <Link
            className="hover:text-gray-400 text-3xl max-md:text-2xl"
            to={"mailto:idreesyomi@gmail.com"}
          >
            <MdOutlineMail />
          </Link>
          <Link
            className="hover:text-gray-400 text-3xl max-md:text-2xl"
            to={"https://wa.me/2347063923692"}
          >
            <FaWhatsapp />
          </Link>
        </div>
        <p className="text-center font-light text-sm max-md:text-xs">
          &copy; Developer{" "}
          <span>
            <Link to={"Https://linkedin.com/in/ao-idris"} className='hover:underline'>Yomabd.</Link>{" "}
          </span>{" "}
          All rights reserved
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
