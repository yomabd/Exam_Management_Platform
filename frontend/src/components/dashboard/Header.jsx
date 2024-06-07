// Header.jsx
import React from 'react';

const Header = ({ title }) => {
  return (
    <header className= "fixed left-0 right-0 z-[2] bg-gray-800 text-white py-4 md:px-40 lg:px-60 shadow-md">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
};

export default Header;
