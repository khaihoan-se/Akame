import React from 'react'

interface FormSeachAnimeProps {
    handleSearch: any
}
const FormSearchManga: React.FC<FormSeachAnimeProps> = ({
    handleSearch
}) => {
    return (
        <div className="mb-8 flex items-center space-x-2">
            <input type="text" className="text-black" onChange={handleSearch} />
        </div>
    )
}

export default FormSearchManga