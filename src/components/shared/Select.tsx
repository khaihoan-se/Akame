import Link from 'next/link';
import React, { useState } from 'react';
import { RiArrowDownSLine } from "react-icons/ri";

const Select = () => {
  const [ type, setType ] = useState('Anime')
  const [ openType, setOpenType ] = useState(false)

  const handleSubText = (event: any) => {
    setOpenType(false)
    setType(event.currentTarget.textContent)
  }
  return (
    <div className='text-2xl'>
      <div className="relative min-w-[100px]">
        <div className='w-full flex items-center ml-2 py-2 px-4 bg-[#1a1a1a] rounded-md cursor-pointer'
          onClick={() => setOpenType(!openType)}
        >
          {type}
          <RiArrowDownSLine className='ml-2' />
        </div>
        {openType && <ul className='w-full ml-2 py-2 px-4 bg-[#1a1a1a] rounded-md absolute top-14'>
          <li className='mb-2 p-2 hover:bg-black rounded-md' onClick={handleSubText} >
            <Link href={`/browse?type=anime`}>
              Anime
            </Link>
          </li>
          <li className='p-2 hover:bg-black rounded-md' onClick={handleSubText} >
            <Link href={`/browse?type=manga`}>
              Manga
            </Link>
          </li>
        </ul>}
      </div>
    </div> 
  )
}

export default React.memo(Select)