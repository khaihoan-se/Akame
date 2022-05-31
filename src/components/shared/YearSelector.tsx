import { YEAR } from '@/constants/en';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";

interface Icon {
    className?: string;
}

interface SelectorProps {
    title: string;
    RightIcon?: any;
}

const YearSelector: React.FC<SelectorProps> = ({
    title,
    RightIcon,
}) => {
    const router = useRouter()
    const [ open, setOpen ] = useState(false);
    const [ searchGenres, setSearchGenres ] = useState<any>('Any')

    const handleOpen = () => {
        setOpen(!open)
    }
    const handleGetItem = (event: any) => {
        setSearchGenres(event.currentTarget.textContent);
        router.query.seasonYear = event.currentTarget.textContent
        router.push(router)
        setOpen(false)
    }
    const handRemove = () => {
        setSearchGenres('Any')
        setOpen(false)
        router.replace('/browse?type=anime', undefined, { shallow: true })
    }

    
    return (
        <div className="space-y-2 relative">
            <p className='font-semibold'>{title}</p>
            <div className="shadow flex items-center space-x-2 bg-background-800 focus:ring focus:ring-primary-500 focus:shadow-outline rounded px-3 py-2 border border-white/80" >
                <div className='min-w-[150px]'
                    onClick={handleOpen}
                >{searchGenres}</div>
                {
                    searchGenres === 'Any' ? <RightIcon className='text-2xl' onClick={handleOpen} /> : <CgClose className="cursor-pointer text-xl" onClick={handRemove} />
                }
            </div>
            {open && <div className="no-scroll w-full absolute bg-background-800 z-40 px-4 py-2 max-h-[300px] overflow-hidden overflow-y-auto rounded-md">
                {
                    YEAR.map((item: any, index: number) => (
                        <div className='my-2 hover:bg-black py-2 px-4 rounded-md cursor-pointer'
                            key={index}
                            onClick={handleGetItem}
                        >{item.value}</div>
                    ))
                }
            </div>}
        </div>
    );
}

export default React.memo(YearSelector);
