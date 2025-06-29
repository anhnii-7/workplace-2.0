import React from 'react';

const Switch = () => {
  return (
    <div className="relative inline-block w-12 h-6">
      <input 
        id="toggler-1" 
        name="toggler-1" 
        type="checkbox" 
        defaultValue={1}
        className="sr-only"
      />
      <label 
        htmlFor="toggler-1"
        className="block w-12 h-6 bg-gray-200 rounded-full cursor-pointer transition-colors duration-200 ease-in-out relative"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-4 h-4 text-green-500 opacity-0 transition-opacity duration-200" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <polyline className="fill-none stroke-current stroke-2" points="100.2,40.2 51.5,88.8 29.8,67.5" />
          </svg>
          <svg className="w-4 h-4 text-red-500 opacity-100 transition-opacity duration-200" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <line className="stroke-current stroke-2" x1="34.4" y1="34.4" x2="95.8" y2="95.8" />
            <line className="stroke-current stroke-2" x1="95.8" y1="34.4" x2="34.4" y2="95.8" />
          </svg>
        </div>
      </label>
    </div>
  );
};

export default Switch;
