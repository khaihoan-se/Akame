import classNames from "classnames";
import React from "react";
import { FiSearch } from "react-icons/fi"

interface Props {
    classSearch?: string
}
const Search: React.FC<Props> = ({ classSearch }) => {
    return (
        <div className={classNames(
            "bg-background-900 flex items-center px-3 py-2 rounded-md min-w-[300px]", classSearch
        )}>
            <input className="outline-none bg-transparent placeholder:text-sm w-full" type="text" placeholder="Search..." />
            <FiSearch className="text-white text-lg hover:text-primary-400 cursor-pointer" />
        </div>
    )
}

export default Search;