import Input from '@/components/shared/Input'
import GenreSelector from '@/components/shared/GenreSelector';
import React from 'react';
import { BiSearch } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";


interface FormSeachAnimeProps {
    handleSearch: any,
}
const FormSeachAnime: React.FC<FormSeachAnimeProps> = ({
    handleSearch,
}) => {
    return (
        <form className='space-y-4 mb-10'>
            <div className='flex flex-col md:flex-row md:items-end gap-6 lg:flex-wrap lg:justify-between lg:space-x-0'>
                <div className='snap-x flex items-center gap-6'>
                    <Input onChange={handleSearch} RightIcon={BiSearch} title="Search" />
                    
                    <GenreSelector 
                        title="Genres" 
                        RightIcon={RiArrowDownSLine}
                    />
                </div>
            </div>
        </form>
    )
}

export default FormSeachAnime