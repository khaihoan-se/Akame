import React from 'react';

interface Icon {
   className?: string;
}

interface InputProps {
   RightIcon?: React.ComponentType<Icon>;
   onChange: () => void;
   title: string;
}

const Input: React.FC<InputProps> = ({
   onChange,
   RightIcon,
   title
}) => {
   return (
      <div>
         <p className='mb-2 font-semibold'>{title}</p>
         <div className="shadow flex items-center space-x-2 bg-background-800 focus:ring focus:ring-primary-500 focus:shadow-outline rounded px-3 py-2 border border-white/80">
            <input className='bg-transparent appearance-none w-full text-gray-300 focus:outline-none leading-tight' type="text" onChange={onChange} />
            { RightIcon && <RightIcon className='text-2xl' /> }
         </div>
      </div>
   );
}

export default Input;
