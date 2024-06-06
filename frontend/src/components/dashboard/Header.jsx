// Header.jsx
import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 shadow-md">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
};

export default Header;
