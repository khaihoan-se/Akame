import Input from '@/components/shared/Input'
import GenreSelector from '@/components/shared/GenreSelector';
import React from 'react';
import { BiSearch } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";
import YearSelector from '@/components/shared/YearSelector';
import SeasonSelector from '@/components/shared/SeasonSelector';
import FormatSelector from '@/components/shared/FormatSelector';


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
                    <YearSelector 
                        title="Year"
                        RightIcon={RiArrowDownSLine}
                    />
                    <SeasonSelector 
                        title="Season"
                        RightIcon={RiArrowDownSLine}
                    />

                    <FormatSelector 
                        title="Format"
                        RightIcon={RiArrowDownSLine}
                    />
                </div>
                <div className='flex items-end justify-end'>
                    
                </div>
            </div>
        </form>
    )
}

export default FormSeachAnime