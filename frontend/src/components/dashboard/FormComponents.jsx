import React from 'react';

export const FormGroup = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

export const FormLabel = ({ htmlFor, required, children }) => (
  <label htmlFor={htmlFor} className="block text-gray-700">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export const Input = ({ className, ...props }) => (
  <input className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`} {...props} />
);

export const Select = ({ className, children, ...props }) => (
  <select className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`} {...props}>
    {children}
  </select>
);

export const Button = ({ className, children, ...props }) => (
  <button className={`mt-4 w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 ${className}`} {...props}>
    {children}
  </button>
);

export const ExamCard = ({className, children}) =>(

  <div className={`mt-1 rounded-md border-gray-300 shadow-sm text-white hover:bg-indigo-700 hover:scale-[1.02] bg-indigo-600 w-[250px] border-2 m-2 h-40 p-4  ${className} `}>
    {children}
  </div>
)
