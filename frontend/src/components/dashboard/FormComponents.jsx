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
  <input className={`mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 ${className}`} {...props} />
);

export const Select = ({ className, children, ...props }) => (
  <select className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 ${className}`} {...props}>
    {children}
  </select>
);

export const Button = ({ className, children, ...props }) => (
  <button className={` ${className} mt-4 w-full bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-700 `} {...props}>
    {children}
  </button>
);
export const BackButton = ({ className, children, ...props }) => (
  <button className={` ${className} bg-black max-auto py-2 px-6 text-white rounded-md hover:bg-gray-600 flex space-x-2 mb-6 mt-12 max-md:mt-6 items-center `} {...props}>
    {children}
  </button>
);

export const ExamCard = ({className, children}) =>(

  <div className={`mt-1 rounded-md shadow-md text-white hover:bg-gray-500 hover:scale-[1.02] font-extralight bg-gray-600 w-48 md:w-56 h-40 max-md:p-2 p-4 z[-0] max-sm:text-xs  ${className} `}
  >
    {children}
  </div>
)
export const DashboardCard = ({className, children, showCandidate}) =>(

  <div className={`text-center rounded-lg shadow-md text-white hover:bg-gray-500 hover:scale-[1.02] bg-gray-600 p-4 z[-0] h-16 gri items-cente max-md:text-sm max-sm:text-xs font-extralight w-[200px] sm:w-[230px] md:w-[250px] sm:h-24 lg:h-32 italic hover:cursor-pointer  ${className} `}
  onClick={showCandidate}
  >
    {children}
  </div>
)
