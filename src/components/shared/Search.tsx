import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi"
import ModuleSearch from "./ModuleSearch";

interface Props {
    classSearch?: string;
}
const Search: React.FC<Props> = ({ classSearch }) => {
    const [ openSearch, setOpenSearch ] = useState<boolean>(false);
    const handleOpenModuleSearch = (e: any) => {
        e.stopPropagation();
        setOpenSearch(true);
    }
    useEffect(() => {
        document.addEventListener('click', () => {
            setOpenSearch(false)
        })
    }, [])
    return (
        <>
            <div className={classNames(
            "bg-background-900 flex items-center px-3 py-2 rounded-md min-w-[300px] relative", classSearch
            )}
            onClick={handleOpenModuleSearch}
            >
                <input className="outline-none bg-transparent placeholder:text-sm w-full" type="text" placeholder="Search..." />
                <FiSearch className="text-white text-lg hover:text-primary-400 cursor-pointer" />
            </div>
            { openSearch && <ModuleSearch /> }
        </>
    )
}

export default Search;